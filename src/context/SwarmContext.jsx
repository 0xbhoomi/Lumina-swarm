import React, { createContext, useContext, useState, useEffect } from 'react';

const SwarmContext = createContext();

export const SwarmProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('1.5');
  const [selectedChain, setSelectedChain] = useState({ id: 'base', name: 'Base Sepolia', asset: 'ETH', pair: 'ETH/USDC' });
  const [stats, setStats] = useState({
    inferences: 12,
    memorySlices: 487,
    executions: 8,
    latency: '12ms'
  });
  const [memory, setMemory] = useState([
    { chain: 'Base Sepolia', amount: '0.5', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'TRADE' },
    { chain: 'Ethereum Sepolia', amount: '1.2', timestamp: new Date(Date.now() - 7200000).toISOString(), type: 'ANALYSIS' }
  ]);
  const [messages, setMessages] = useState([
    { agent: 'Listener', text: "✓ [GENSYN AXL] Social sentiment spike detected for $ETH. Signal strength: 0.88.", type: 'listener' },
    { agent: 'Analyst', text: "✓ [0G COMPUTE] Sealed inference completed. Breakout probability: 92%. Liquidity on Uniswap V3 is optimal.", type: 'analyst' },
    { agent: 'Executor', text: "✓ [KEEPERHUB] Lumina-Swarm ready. Multi-agent consensus reached via AXL P2P.", type: 'executor' }
  ]);
  
  const [p2pLogs, setP2pLogs] = useState([
    "[AXL] Node synced at localhost:9002",
    "[0G] Storing intent hash: 0x7a...2b",
    "[SWARM] Agent-to-Agent negotiation started",
    "[LISTENER] Sentiment score: 0.89",
    "[ANALYST] Technical score: 0.75",
    "[SWARM] Threshold reached (1.64 > 1.6)"
  ]);

  const [status, setStatus] = useState('idle'); 
  const [executionStep, setExecutionStep] = useState(0);

  const steps = [
    "Checking Liquidity on Uniswap...",
    "Encrypting P2P Signal via AXL...",
    "Storing Intent on 0G...",
    "Broadcasting via KeeperHub..."
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Wallet connection failed", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const addMessage = (text) => {
    setMessages(prev => [...prev, { agent: 'User', text, type: 'user' }]);
    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        agent: 'Analyst', 
        text: `Processing query: "${text}". Monitoring swarm signals for ${amount} ETH trade...`, 
        type: 'analyst' 
      }]);
    }, 1000);
  };

  const triggerTrade = async () => {
    if (!account) return alert("Connect wallet first!");
    
    setStatus('executing');
    setExecutionStep(0);

    try {
      // 1. Uniswap Quote
      await fetch(`http://localhost:9002/uniswap/quote?amount=${amount}&pair=ETH/USDC`);
      setExecutionStep(1);

      // 2. AXL Negotiation
      const axlRes = await fetch('http://localhost:9002/axl/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, pair: 'ETH/USDC' })
      });
      const axlData = await axlRes.json();
      setExecutionStep(2);

      // 3. 0G Storage Log
      const logEntry = { account, amount, axlSignal: axlData.signal, chain: selectedChain.name, timestamp: new Date().toISOString() };
      await fetch('http://localhost:9002/0g/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log: logEntry })
      });
      setMemory(prev => [logEntry, ...prev]);
      setExecutionStep(3);

      // 4. KeeperHub Execution
      const keeperRes = await fetch('http://localhost:9002/keeper/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txData: { to: '0x...', value: amount } })
      });
      const keeperData = await keeperRes.json();

      if (keeperData.success) {
        setStatus('success');
      }
    } catch (err) {
      console.error("Execution failed", err);
      setStatus('idle');
      alert("Swarm execution failed. Is the backend running?");
    }
  };

  return (
    <SwarmContext.Provider value={{ 
      messages, 
      p2pLogs, 
      status, 
      setStatus, 
      executionStep, 
      steps,
      triggerTrade,
      account,
      connectWallet,
      amount,
      setAmount,
      selectedChain,
      setSelectedChain,
      memory,
      stats,
      addMessage
    }}>
      {children}
    </SwarmContext.Provider>
  );
};

export const useSwarm = () => useContext(SwarmContext);
