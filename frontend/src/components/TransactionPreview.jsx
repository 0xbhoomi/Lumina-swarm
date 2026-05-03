// Transaction preview component with real market data & AI decision
import React from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Gauge, Zap, TrendingDown, Layers, RefreshCw, Brain, TrendingUp } from 'lucide-react';
import { useSwarm } from '../context/useSwarm';

const TransactionPreview = () => {
  const {
    amount, setAmount, selectedChain,
    marketData, marketLoading, fetchMarketData,
    aiDecision, aiLoading, fetchAiDecision,
    quote, quoteLoading, fetchQuote,
    account
  } = useSwarm();

  const quotePrice = quote?.price ? Number(quote.price) : null;
  const guaranteedPrice = quote?.guaranteedPrice ? Number(quote.guaranteedPrice) : null;
  const slippagePct = quotePrice && guaranteedPrice
    ? Math.max(((quotePrice - guaranteedPrice) / quotePrice) * 100, 0)
    : null;

  let gasUsd = null;
  if (quote?.gas && quote?.gasPrice && marketData?.eth) {
    try {
      const feeWei = BigInt(quote.gas) * BigInt(quote.gasPrice);
      const feeEth = Number(ethers.formatEther(feeWei));
      gasUsd = feeEth * Number(marketData.eth);
    } catch {
      gasUsd = null;
    }
  }

  const riskLabel = aiDecision?.riskScore || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="brutal-card p-6 w-full max-w-md bg-white flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-vibrant" />
          Trade Proposal
        </h3>
        <Shield className="w-8 h-8 text-charcoal" />
      </div>

      {/* Step 1: Fetch Real Market Data */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-charcoal/60">Step 1 — Live Prices</span>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchMarketData}
              disabled={marketLoading || !account}
              className="flex items-center gap-1 px-3 py-1.5 bg-solar border-2 border-charcoal text-[10px] font-black uppercase rounded-lg hover:bg-vibrant hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3 h-3 ${marketLoading ? 'animate-spin' : ''}`} />
              {marketLoading ? 'Fetching...' : 'Fetch Market Data'}
            </button>
            <button
              onClick={fetchQuote}
              disabled={quoteLoading || !account}
              className="flex items-center gap-1 px-3 py-1.5 bg-cream border-2 border-charcoal text-[10px] font-black uppercase rounded-lg hover:bg-charcoal hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3 h-3 ${quoteLoading ? 'animate-spin' : ''}`} />
              {quoteLoading ? 'Quoting...' : 'Fetch Quote'}
            </button>
          </div>
        </div>

        {marketData ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 border-2 border-green-500 rounded-xl">
              <div className="text-[9px] font-black uppercase text-green-600 mb-0.5">ETH (Live)</div>
              <div className="text-xl font-black text-green-700">${marketData.eth.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-blue-50 border-2 border-blue-400 rounded-xl">
              <div className="text-[9px] font-black uppercase text-blue-500 mb-0.5">USDC (Live)</div>
              <div className="text-xl font-black text-blue-600">${marketData.usdc}</div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-cream border-2 border-dashed border-charcoal/30 rounded-xl text-center text-[10px] font-bold uppercase opacity-50">
            {account ? 'Click Fetch Market Data to get live prices' : 'Connect wallet first'}
          </div>
        )}
      </div>

      {/* Step 2: AI Analysis */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-charcoal/60">Step 2 — AI Decision</span>
          <button
            onClick={fetchAiDecision}
            disabled={aiLoading || !marketData}
            className="flex items-center gap-1 px-3 py-1.5 bg-peach border-2 border-charcoal text-[10px] font-black uppercase rounded-lg hover:bg-vibrant hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Brain className={`w-3 h-3 ${aiLoading ? 'animate-pulse' : ''}`} />
            {aiLoading ? 'Analysing...' : 'Get AI Analysis'}
          </button>
        </div>

        {aiDecision ? (
          <div className={`p-4 border-3 rounded-xl ${aiDecision.action === 'BUY' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`flex items-center gap-2 text-lg font-black ${aiDecision.action === 'BUY' ? 'text-green-700' : 'text-red-600'}`}>
                <TrendingUp className="w-5 h-5" />
                {aiDecision.action} {aiDecision.asset}
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-black border rounded-full ${aiDecision.action === 'BUY' ? 'bg-green-200 border-green-600 text-green-700' : 'bg-red-200 border-red-500 text-red-700'}`}>
                {aiDecision.confidence}
              </span>
            </div>
            <p className="text-[10px] font-bold text-charcoal/70 leading-snug">{aiDecision.reasoning}</p>
          </div>
        ) : (
          <div className="p-3 bg-cream border-2 border-dashed border-charcoal/30 rounded-xl text-center text-[10px] font-bold uppercase opacity-50">
            {marketData ? 'Click Get AI Analysis to get recommendation' : 'Fetch market data first'}
          </div>
        )}
      </div>

      {/* Pair & Slippage */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-peach border-3 border-charcoal rounded-xl shadow-[4px_4px_0px_#2F2F2F] relative group">
          <label className="text-[10px] font-black uppercase text-charcoal/60 mb-1 block">Pair</label>
          <div className="text-lg font-black">{selectedChain.pair}</div>
          <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-white border-2 border-charcoal text-[7px] font-black uppercase shadow-[2px_2px_0px_#2F2F2F]">
            ← Uniswap V3
          </div>
        </div>
        <div className="p-3 bg-cream border-3 border-charcoal rounded-xl shadow-[4px_4px_0px_#2F2F2F] relative group">
          <label className="text-[10px] font-black uppercase text-charcoal/60 mb-1 block">Slippage</label>
          <div className="text-lg font-black text-green-600">
            {slippagePct !== null ? `${slippagePct.toFixed(2)}%` : '--'}
          </div>
          <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-white border-2 border-charcoal text-[7px] font-black uppercase shadow-[2px_2px_0px_#2F2F2F]">
            ← KeeperHub Prot.
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="relative group">
        <label className="text-[10px] font-black uppercase text-charcoal/60 mb-2 block ml-1">Swap Amount</label>
        <div className="relative">
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 text-3xl font-black border-3 border-charcoal bg-white focus:outline-none rounded-xl"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-charcoal/30 text-xl">{selectedChain.asset}</div>
        </div>
        <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-solar border-2 border-charcoal text-[8px] font-black uppercase shadow-[3px_3px_0px_#2F2F2F]">
          Verified via Gensyn AXL
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="flex items-center gap-3 p-3 border-2 border-charcoal bg-white rounded-lg">
          <Gauge className="w-5 h-5 text-solar" />
          <div>
            <span className="text-[8px] font-black uppercase block text-charcoal/60">Gas Fee</span>
            <span className="text-xs font-black">{gasUsd !== null ? `~$${gasUsd.toFixed(2)}` : '--'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border-2 border-charcoal bg-white rounded-lg">
          <TrendingDown className="w-5 h-5 text-vibrant" />
          <div>
            <span className="text-[8px] font-black uppercase block text-charcoal/60">AI Confidence</span>
            <span className="text-xs font-black">{aiDecision ? aiDecision.confidence : '--'}</span>
          </div>
        </div>
      </div>

      {/* Risk */}
      <div className="pt-1">
        <div className="flex justify-between items-end mb-2">
          <label className="text-[10px] font-black uppercase text-charcoal/60">Risk Score</label>
          <span className={`text-xs font-black uppercase flex items-center gap-1 ${riskLabel ? 'text-green-600' : 'text-charcoal/50'}`}>
            {riskLabel || 'NOT AVAILABLE'}
            <Zap className={`w-3 h-3 ${riskLabel ? 'fill-green-600' : 'fill-charcoal/30'}`} />
          </span>
        </div>
        <div className="h-6 w-full border-3 border-charcoal bg-cream overflow-hidden flex rounded-lg">
          <div className={`h-full border-r-3 border-charcoal ${riskLabel ? 'w-1/3 bg-green-400' : 'w-1/6 bg-charcoal/20'}`} />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-solar/10 border-3 border-charcoal border-dashed rounded-xl">
        <AlertTriangle className="w-6 h-6 text-vibrant flex-shrink-0" />
        <p className="text-[10px] font-bold leading-snug">
          {aiDecision
            ? <>AI recommends <span className="font-black text-vibrant">{aiDecision.action}</span>. Execution routing via <span className="font-black text-vibrant">KEEPERHUB SAFE-FLOW</span>.</>
            : <>Swarm intent synced with <span className="font-black text-vibrant">0G STORAGE</span>. Fetch data &amp; run AI to unlock execution.</>
          }
        </p>
      </div>
    </motion.div>
  );
};

export default TransactionPreview;
