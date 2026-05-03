import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CheckCircle, Activity, Zap, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const SimpleFlow = () => {
  const [account, setAccount] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [tradeStatus, setTradeStatus] = useState('idle'); // idle, loading, success, error
  const [txHash, setTxHash] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [amount, setAmount] = useState('0.01');

  const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // Step 1: Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect wallet');
    }
  };

  // Step 2: Fetch Market Data
  const fetchMarketData = async () => {
    try {
      setTradeStatus('loading');
      const res = await fetch(`${apiBase}/price`);
      const data = await res.json();
      setPriceData({
        eth: data.ethereum,
        usdc: data.usdc
      });
      setTradeStatus('idle');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to fetch price data');
      setTradeStatus('idle');
    }
  };

  // Step 3: AI Suggestion
  const getAiSuggestion = async () => {
    if (!priceData) return;
    try {
      setTradeStatus('loading');
      const res = await fetch(`${apiBase}/api/ai-decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_eth: priceData.eth, price_usdc: priceData.usdc })
      });
      const data = await res.json();
      setAiSuggestion(data);
      setTradeStatus('idle');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to get AI suggestion');
      setTradeStatus('idle');
    }
  };

  // Step 4: Execute Trade
  const executeTrade = async () => {
    if (!account) return alert('Please connect wallet first!');
    try {
      setTradeStatus('loading');
      setErrorMsg('');

      // Get real swap tx data from backend
      const res = await fetch(`${apiBase}/api/swap-tx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress: account, amountInEther: amount })
      });
      
      const txData = await res.json();
      if (!res.ok) throw new Error(txData.detail || 'Failed to build transaction');

      // Send to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: txData.to,
        data: txData.data,
        value: BigInt(txData.value || '0')
      });

      await tx.wait();
      
      setTxHash(tx.hash);
      setTradeStatus('success');
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF8C00', '#FFDAB9']
      });

    } catch (err) {
      console.error("Execution failed", err);
      setErrorMsg(err.message || 'Transaction failed or rejected');
      setTradeStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-charcoal text-white p-6 rounded-2xl shadow-brutal border-4 border-charcoal">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Lumina-Swarm</h1>
            <p className="text-sm font-bold opacity-80 mt-1 uppercase">Simple Execution Flow</p>
          </div>
          <button 
            onClick={connectWallet}
            className={`px-6 py-3 border-4 border-charcoal shadow-brutal font-black uppercase text-sm rounded-xl transition-transform hover:-translate-y-1 ${account ? 'bg-peach text-charcoal' : 'bg-solar text-charcoal'}`}
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </header>

        {errorMsg && (
          <div className="bg-red-400 p-4 rounded-xl border-4 border-charcoal shadow-brutal font-bold text-white flex items-center justify-between">
            {errorMsg}
            <button onClick={() => setErrorMsg('')} className="underline text-sm uppercase">Dismiss</button>
          </div>
        )}

        {/* Step 2: Fetch Data */}
        <div className={`bg-white p-6 rounded-2xl border-4 border-charcoal shadow-brutal transition-opacity ${account ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
              <Activity className="w-6 h-6 text-vibrant" /> 1. Market Data
            </h2>
            <button 
              onClick={fetchMarketData}
              disabled={tradeStatus === 'loading'}
              className="px-4 py-2 bg-charcoal text-white font-black uppercase text-sm rounded-lg border-2 border-charcoal hover:bg-vibrant transition-colors"
            >
              Fetch Prices
            </button>
          </div>
          {priceData && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cream p-4 rounded-xl border-2 border-charcoal flex flex-col items-center">
                <span className="text-sm font-bold opacity-60 uppercase">Ethereum</span>
                <span className="text-3xl font-black">${priceData.eth}</span>
              </div>
              <div className="bg-cream p-4 rounded-xl border-2 border-charcoal flex flex-col items-center">
                <span className="text-sm font-bold opacity-60 uppercase">USDC</span>
                <span className="text-3xl font-black">${priceData.usdc}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: AI Suggestion */}
        <div className={`bg-white p-6 rounded-2xl border-4 border-charcoal shadow-brutal transition-opacity ${priceData ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
              <Zap className="w-6 h-6 text-solar" /> 2. AI Decision
            </h2>
            <button 
              onClick={getAiSuggestion}
              disabled={tradeStatus === 'loading'}
              className="px-4 py-2 bg-charcoal text-white font-black uppercase text-sm rounded-lg border-2 border-charcoal hover:bg-solar transition-colors hover:text-charcoal"
            >
              Get Suggestion
            </button>
          </div>
          {aiSuggestion && (
            <div className="bg-cream p-6 rounded-xl border-2 border-charcoal flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-black uppercase">Recommendation</span>
                <span className={`px-4 py-1 rounded-full border-2 border-charcoal font-black text-white ${aiSuggestion.action === 'BUY' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {aiSuggestion.action} {aiSuggestion.asset}
                </span>
              </div>
              <p className="font-bold text-charcoal/80">{aiSuggestion.reasoning}</p>
              <div className="flex justify-between items-center mt-2 border-t-2 border-charcoal/10 pt-4">
                <span className="text-sm font-black uppercase opacity-50">Confidence</span>
                <span className="text-xl font-black">{aiSuggestion.confidence}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Execute */}
        <div className={`bg-white p-6 rounded-2xl border-4 border-charcoal shadow-brutal transition-opacity ${aiSuggestion ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <h2 className="text-2xl font-black uppercase flex items-center gap-2 mb-6">
            <ShieldCheck className="w-6 h-6 text-green-500" /> 3. Execution
          </h2>

          <div className="mb-4">
            <label className="text-[10px] font-black uppercase opacity-60 block mb-2">Swap Amount (ETH)</label>
            <input
              type="number"
              min="0.001"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-3 border-charcoal rounded-xl font-black text-lg"
            />
          </div>
          
          {tradeStatus === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-20 h-20 text-green-500" />
              <h3 className="text-3xl font-black uppercase italic text-center">Trade Executed!</h3>
              <a 
                href={`https://sepolia.arbiscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-6 py-3 bg-charcoal text-white font-black uppercase text-sm rounded-xl border-4 border-charcoal hover:bg-vibrant transition-colors"
              >
                View on Arbiscan
              </a>
              <button 
                onClick={() => {
                  setTradeStatus('idle');
                  setTxHash('');
                }}
                className="underline font-bold mt-2"
              >
                Start New Flow
              </button>
            </div>
          ) : (
            <button
              onClick={executeTrade}
              disabled={tradeStatus === 'loading'}
              className="w-full py-6 bg-vibrant text-white border-4 border-charcoal shadow-brutal font-black uppercase text-2xl rounded-2xl transition-transform hover:-translate-y-2 active:translate-y-0 relative overflow-hidden group disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {tradeStatus === 'loading' ? 'Processing...' : `Execute ${aiSuggestion?.action || 'Trade'}`}
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleFlow;
