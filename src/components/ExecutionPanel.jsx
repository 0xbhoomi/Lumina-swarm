import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useSwarm } from '../context/SwarmContext';

const ExecutionPanel = () => {
  const { status, executionStep, steps } = useSwarm();

  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 brutal-card m-6 bg-white overflow-hidden"
    >
      <div className="p-4 border-b-3 border-charcoal bg-vibrant text-white font-black uppercase flex justify-between items-center">
        <span>Execution Status</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-3 h-3 border-2 border-white ${i <= executionStep ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>
      </div>
      
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 w-full space-y-3">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-3 font-bold ${i === executionStep ? 'text-vibrant' : i < executionStep ? 'text-charcoal/40' : 'text-charcoal'}`}>
              {i < executionStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : i === executionStep ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              <span className={i === executionStep ? 'text-lg italic' : ''}>{step}</span>
            </div>
          ))}
        </div>

        <div className="hidden md:block w-px h-24 bg-charcoal/20 mx-6" />

        <div className="flex flex-col items-center justify-center min-w-[200px]">
          <div className="text-4xl font-black mb-2">
            {Math.round(((executionStep + 1) / steps.length) * 100)}%
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">
            Broadcasting via AXL Network
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExecutionPanel;
