import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, ExternalLink, Award } from 'lucide-react';
import { useSwarm } from '../context/SwarmContext';

const MemoryPanel = () => {
  const { memory } = useSwarm();

  return (
    <div className="brutal-card bg-white overflow-hidden flex flex-col min-h-[350px]">
      <div className="p-3 border-b-3 border-charcoal bg-peach font-black uppercase flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Swarm Memory (0G)
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black">SYNCED</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/10">
        <AnimatePresence initial={false}>
          {memory.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 border-2 border-charcoal bg-white shadow-[3px_3px_0px_#2F2F2F] text-[10px] font-mono group"
            >
              <div className="flex justify-between mb-1">
                <span className="text-vibrant font-black">LOG_{i + 485} → 0G_HASH</span>
                <span className="opacity-40">{new Date(item.timestamp).toLocaleTimeString([], { hour12: false })}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-cream p-1 border border-charcoal/10">CHAIN: {item.chain}</div>
                <div className="bg-solar/10 p-1 border border-charcoal/10">TYPE: {item.type || 'TRADE'}</div>
              </div>
              <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-black underline cursor-pointer">View Payload on 0G</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t-3 border-charcoal bg-cream">
        <button className="w-full brutal-btn bg-vibrant py-3 px-4 flex items-center justify-center gap-3 text-white font-black uppercase text-xs rounded-xl shadow-[4px_4px_0px_#2F2F2F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          <Award className="w-5 h-5" />
          Mint Swarm Brain as iNFT
        </button>
        <div className="mt-2 text-center">
          <a href="#" className="text-[8px] font-black uppercase underline decoration-vibrant/40 flex items-center justify-center gap-1">
            Explorer: 0x7857...brain-iNFT <ExternalLink className="w-2 h-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemoryPanel;
