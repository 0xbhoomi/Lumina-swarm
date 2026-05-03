// Sidebar logs component
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Terminal } from 'lucide-react';
import { useSwarm } from '../context/useSwarm';

const Sidebar = () => {
  const { p2pLogs } = useSwarm();

  // Mock log entries
  const formattedLogs = [
    "[GENSYN AXL] Agent-to-Agent P2P message delivered (12ms)",
    "[0G STORAGE] KV write successful • Log entry #487 appended",
    "[0G COMPUTE] Sealed inference completed on qwen3.6-plus (214ms)",
    "[KEEPERHUB] Safe transaction prepared • Gas optimized",
    "[UNISWAP V3] Quote received • Liquidity depth: Deep",
    "[SWARM] Consensus reached (1.82/2.0)",
    "[SWARM] Lumina-Swarm ready for execution"
  ];

  return (
    <div className="hidden lg:flex flex-col w-80 h-full brutal-card bg-charcoal text-cream overflow-hidden">
      <div className="p-4 border-b-3 border-cream bg-charcoal font-black uppercase flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-solar" />
          P2P Log Stream
        </div>
        <div className="flex items-center gap-1 text-[8px] text-green-400 animate-pulse">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          LIVE
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[10px]">
        {formattedLogs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-start gap-2 py-1 border-b border-white/5"
          >
            <span className="text-solar opacity-40">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}]</span>
            <span className="flex-1 text-cream/90">{log}</span>
            <span className="text-green-400 font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">✓ LIVE</span>
          </motion.div>
        ))}
        
        <div className="pt-4 flex flex-col gap-2">
          <div className="p-2 bg-white/5 border border-white/10 rounded flex justify-between items-center italic text-[9px]">
            <span className="opacity-60">Syncing with 0G Storage...</span>
            <div className="w-2 h-2 bg-solar rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t-3 border-cream bg-solar text-charcoal font-black text-center text-[10px] uppercase tracking-tighter flex items-center justify-center gap-2">
        <Activity className="w-3 h-3 animate-pulse" />
        AXL NODE STATUS: ONLINE (9002)
      </div>
    </div>
  );
};

export default Sidebar;
