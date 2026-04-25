// Transaction preview component
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Gauge, Zap, TrendingDown, Layers } from 'lucide-react';
import { useSwarm } from '../context/SwarmContext';

const TransactionPreview = () => {
  const { amount, setAmount, selectedChain } = useSwarm();
  const risk = 'low';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="brutal-card p-6 w-full max-w-md bg-white flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-vibrant" />
          Trade Proposal
        </h3>
        <Shield className="w-8 h-8 text-charcoal" />
      </div>

      <div className="space-y-4">
        {/* Token Pair & Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-peach border-3 border-charcoal rounded-xl shadow-[4px_4px_0px_#2F2F2F] relative group">
            <label className="text-[10px] font-black uppercase text-charcoal/60 mb-1 block">Pair</label>
            <div className="text-xl font-black">{selectedChain.pair}</div>
            <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-white border-2 border-charcoal text-[7px] font-black uppercase shadow-[2px_2px_0px_#2F2F2F] group-hover:scale-110 transition-transform">
              ← Uniswap V3
            </div>
          </div>
          <div className="p-4 bg-cream border-3 border-charcoal rounded-xl shadow-[4px_4px_0px_#2F2F2F] relative group">
            <label className="text-[10px] font-black uppercase text-charcoal/60 mb-1 block">Slippage</label>
            <div className="text-xl font-black text-green-600">0.15%</div>
            <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-white border-2 border-charcoal text-[7px] font-black uppercase shadow-[2px_2px_0px_#2F2F2F] group-hover:scale-110 transition-transform">
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
              step="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 text-3xl font-black border-3 border-charcoal bg-white focus:outline-none rounded-xl"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-charcoal/30 text-xl">{selectedChain.asset}</div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-solar border-2 border-charcoal text-[8px] font-black uppercase shadow-[3px_3px_0px_#2F2F2F] group-hover:scale-105 transition-transform">
            Verified via Gensyn AXL
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-3 p-3 border-2 border-charcoal bg-white rounded-lg relative group">
            <Gauge className="w-5 h-5 text-solar" />
            <div>
              <span className="text-[8px] font-black uppercase block text-charcoal/60">Gas Fee</span>
              <span className="text-xs font-black">~$1.24</span>
            </div>
            <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-cream border border-charcoal text-[6px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              ← KeeperHub Opt.
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-2 border-charcoal bg-white rounded-lg relative group">
            <TrendingDown className="w-5 h-5 text-vibrant" />
            <div>
              <span className="text-[8px] font-black uppercase block text-charcoal/60">Consensus</span>
              <span className="text-xs font-black">1.82/2.0</span>
            </div>
            <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-peach border border-charcoal text-[6px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              ← AXL P2P
            </div>
          </div>
        </div>

        {/* Risk Indicator */}
        <div className="pt-2">
          <div className="flex justify-between items-end mb-2">
            <label className="text-[10px] font-black uppercase text-charcoal/60">Risk Score</label>
            <span className="text-xs font-black uppercase text-green-600 flex items-center gap-1">
              LOW RISK <Zap className="w-3 h-3 fill-green-600" />
            </span>
          </div>
          <div className="h-6 w-full border-3 border-charcoal bg-cream overflow-hidden flex rounded-lg">
            <div className="h-full w-1/3 bg-green-400 border-r-3 border-charcoal shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-solar/10 border-3 border-charcoal border-dashed rounded-xl relative">
          <AlertTriangle className="w-6 h-6 text-vibrant" />
          <p className="text-[10px] font-bold leading-snug">
            Swarm intent successfully synced with <span className="font-black text-vibrant">0G STORAGE</span>. Execution routing via <span className="font-black text-vibrant">KEEPERHUB SAFE-FLOW</span>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionPreview;
