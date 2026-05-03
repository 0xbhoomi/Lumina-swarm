import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ExecutorABI from '../contracts/Executor.json';
import { SwarmContext } from './swarmContext';

const DEFAULT_SELL_TOKEN = '0x4200000000000000000000000000000000000006';
const DEFAULT_BUY_TOKEN = '0x833589fCD6eDb6E08f4c7C32D4f71b1566469C3d';

export const SwarmProvider = ({ children }) => {
  const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const sellTokenEnv = import.meta.env.VITE_SELL_TOKEN;
  const buyTokenEnv = import.meta.env.VITE_BUY_TOKEN;
  const sellToken = sellTokenEnv && ethers.isAddress(sellTokenEnv) ? sellTokenEnv : DEFAULT_SELL_TOKEN;
  const buyToken = buyTokenEnv && ethers.isAddress(buyTokenEnv) ? buyTokenEnv : DEFAULT_BUY_TOKEN;
  const chainId = import.meta.env.VITE_CHAIN_ID ? Number(import.meta.env.VITE_CHAIN_ID) : 84532;

  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('0.01');
  const [selectedChain, setSelectedChain] = useState({ id: 'base-sepolia', name: 'Base Sepolia', asset: 'ETH', pair: 'ETH/USDC' });
  const [stats, setStats] = useState({ inferences: 0, memorySlices: 0, executions: 0, latency: '--' });
  const [memory, setMemory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [p2pLogs] = useState([]);
  const [status, setStatus] = useState('idle');
  const [executionStep, setExecutionStep] = useState(0);

  // Real market data & AI decision state
  const [marketData, setMarketData] = useState(null);   // { eth, usdc }
  const [aiDecision, setAiDecision] = useState(null);   // { action, confidence, reasoning }
  const [marketLoading, setMarketLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const steps = [
    "Fetching Uniswap quote...",
    "Building executor call...",
    "Simulating transaction...",
    "Sending transaction..."
  ];

  // Backend health check
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await fetch(`${apiBase}/status`);
        const data = await res.json();
        setStats(prev => ({ ...prev, latency: data?.ok ? 'live' : '--' }));
      } catch { /* backend offline */ }
    };
    loadStatus();
  }, [apiBase]);

  // Load history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const url = account ? `${apiBase}/history?user=${account}` : `${apiBase}/history`;
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMemory(data.map(item => ({
            chain: selectedChain.name,
            amount: item.value,
            // store timestamp as epoch milliseconds for concise UI formatting
            timestamp: item.timestamp * 1000,
            type: 'TRADE',
            txHash: item.txHash
          })));
          setStats(prev => ({ ...prev, executions: data.length }));
        }
      } catch { /* ignore */ }
    };
    loadHistory();
  }, [apiBase, account, selectedChain.name]);

  const ensureChain = async () => {
    if (!window.ethereum || !chainId) return;
    const hexChainId = `0x${chainId.toString(16)}`;
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hexChainId }] });
    } catch (err) { console.warn('Chain switch failed', err); }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        // Also ensure we are on the correct chain immediately
        await ensureChain();
      } catch (err) { 
        console.error("Wallet connection failed", err); 
        alert(`Wallet connection failed: ${err.message}`);
      }
    } else {
      alert("Please install MetaMask! window.ethereum is undefined.");
    }
  };

  // REAL: Fetch live market data from CoinGecko via backend
  const fetchMarketData = async () => {
    setMarketLoading(true);
    setAiDecision(null);
    try {
      const res = await fetch(`${apiBase}/price`);
      if (!res.ok) throw new Error('Price fetch failed');
      const data = await res.json();
      const md = { eth: data.ethereum, usdc: data.usdc };
      setMarketData(md);
      setStats(prev => ({ ...prev, latency: 'live' }));

      // Add to chat
      setMessages(prev => [...prev, {
        agent: 'Analyst',
        text: `Live market data fetched: ETH = $${md.eth.toLocaleString()} | USDC = $${md.usdc}`,
        type: 'analyst'
      }]);
    } catch (err) {
      console.error('Market data fetch failed', err);
      setMessages(prev => [...prev, { agent: 'Analyst', text: 'Failed to fetch market data. Is the backend running?', type: 'analyst' }]);
    } finally {
      setMarketLoading(false);
    }
  };

  // REAL: Fetch live swap quote from 0x via backend
  const fetchQuote = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('Enter a valid amount first');
      return;
    }

    setQuoteLoading(true);
    try {
      const sellAmount = ethers.parseUnits(amount, 18).toString();
      const url = new URL(`${apiBase}/quote`);
      url.searchParams.set('sellToken', sellToken);
      url.searchParams.set('buyToken', buyToken);
      url.searchParams.set('sellAmount', sellAmount);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Quote fetch failed');
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error('Quote fetch failed', err);
      setMessages(prev => [...prev, { agent: 'Analyst', text: 'Quote fetch failed. Check backend.', type: 'analyst' }]);
    } finally {
      setQuoteLoading(false);
    }
  };

  // REAL: Get AI decision from backend based on live price
  const fetchAiDecision = async () => {
    if (!marketData) return alert('Please fetch market data first!');
    setAiLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/ai-decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_eth: marketData.eth, price_usdc: marketData.usdc })
      });
      const data = await res.json();
      setAiDecision(data);
      setStats(prev => ({ ...prev, inferences: prev.inferences + 1 }));

      // Add to chat
      setMessages(prev => [...prev, {
        agent: 'Analyst',
        text: `[AI Decision] ${data.action} ${data.asset} | Confidence: ${data.confidence} | ${data.reasoning}`,
        type: 'analyst'
      }]);
    } catch (err) {
      console.error('AI decision failed', err);
      setMessages(prev => [...prev, { agent: 'Analyst', text: 'AI analysis failed. Check backend.', type: 'analyst' }]);
    } finally {
      setAiLoading(false);
    }
  };

  const addMessage = async (text) => {
    setMessages(prev => [...prev, { agent: 'User', text, type: 'user' }]);
    try {
      const res = await fetch(`${apiBase}/0g/compute/infer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: { prompt: text, model: 'qwen3.6-plus' } })
      });
      const data = await res.json();
      setStats(prev => ({ ...prev, inferences: prev.inferences + 1 }));
      setMessages(prev => [...prev, {
        agent: 'Analyst',
        text: data?.result || JSON.stringify(data),
        type: 'analyst'
      }]);
    } catch (err) {
      console.error('Chat inference failed', err);
      setMessages(prev => [...prev, { agent: 'Analyst', text: 'Backend error. Check console.', type: 'analyst' }]);
    }
  };

  // REAL: Execute trade via Uniswap V3 on Base Sepolia
  const triggerTrade = async () => {
    if (!account) return alert("Connect wallet first!");
    if (!aiDecision) return alert("Run AI analysis first before executing!");

    setStatus('executing');
    setExecutionStep(0);

    try {
      await ensureChain();
      setExecutionStep(1);

      // Get swap tx from backend
      const txRes = await fetch(`${apiBase}/api/swap-tx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress: account, amountInEther: amount })
      });
      const txData = await txRes.json();
      if (!txRes.ok) throw new Error(txData.detail || 'Failed to build transaction');
      setExecutionStep(2);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const executorAddress = import.meta.env.VITE_EXECUTOR_ADDRESS || import.meta.env.VITE_EXECUTOR_CONTRACT_ADDRESS;
      const hasValidExecutor = executorAddress && ethers.isAddress(executorAddress);
      const hasValidTarget = txData?.to && ethers.isAddress(txData.to);

      if (!hasValidTarget) {
        throw new Error(`Backend returned an invalid swap target: ${txData?.to || 'missing'}`);
      }

      let tx;
      if (hasValidExecutor) {
        const executorContract = new ethers.Contract(executorAddress, ExecutorABI, signer);

        // The execute function takes (target, data) and optional value
        tx = await executorContract.execute(
          txData.to,
          txData.data,
          { value: BigInt(txData.value || '0') }
        );
      } else {
        console.warn('Executor address is not configured or invalid; sending swap directly via MetaMask.');
        tx = await signer.sendTransaction({
          to: txData.to,
          data: txData.data,
          value: BigInt(txData.value || '0')
        });
      }

      setExecutionStep(3);
      await tx.wait();

      // Save to 0G storage
      await fetch(`${apiBase}/0g/storage/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // use epoch ms (Date.now()) to keep stored timestamps short and parseable
          payload: { account, amount, chain: selectedChain.name, txHash: tx.hash, timestamp: Date.now() }
        })
      });

      setStats(prev => ({ ...prev, memorySlices: prev.memorySlices + 1 }));
      setStatus('success');
      setMessages(prev => [...prev, {
        agent: 'Analyst',
        text: `Trade executed successfully! TX: ${tx.hash}`,
        type: 'analyst'
      }]);
    } catch (err) {
      console.error("Execution failed", err);
      setStatus('idle');
      alert(`Execution failed: ${err.message}`);
    }
  };

  return (
    <SwarmContext.Provider value={{
      messages, p2pLogs, status, setStatus, executionStep, steps,
      triggerTrade, account, connectWallet,
      amount, setAmount,
      selectedChain, setSelectedChain,
      memory, stats, addMessage,
      marketData, marketLoading, fetchMarketData,
      aiDecision, aiLoading, fetchAiDecision,
      quote, quoteLoading, fetchQuote
    }}>
      {children}
    </SwarmContext.Provider>
  );
};

