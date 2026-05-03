// Safe execute button component
import React from 'react';
import { motion } from 'framer-motion';
import { useSwarm } from '../context/useSwarm';

const SafeExecuteButton = ({ onClick, disabled, loading }) => {
  const { aiDecision, marketData } = useSwarm();

  const isReady = !!aiDecision && !!marketData;
  const label = aiDecision ? `EXEC ${aiDecision.action} ${aiDecision.asset}` : 'Run AI Analysis First';
  const bgColor = aiDecision?.action === 'SELL' ? 'bg-red-400' : 'bg-solar';

  return (
    <div className="flex flex-col gap-2">
      {!isReady && (
        <p className="text-[10px] font-black uppercase text-center text-charcoal/50">
          Complete Steps 1 &amp; 2 above to unlock execution
        </p>
      )}
      <motion.button
        whileHover={isReady && !loading ? { scale: 1.02, x: -2, y: -2 } : {}}
        whileTap={isReady && !loading ? { scale: 0.98, x: 2, y: 2 } : {}}
        onClick={onClick}
        disabled={disabled || loading || !isReady}
        className={`
          relative w-full py-4 px-8 text-xl font-black uppercase tracking-wider
          ${bgColor} text-charcoal border-3 border-charcoal shadow-brutal
          hover:shadow-brutal-hover active:shadow-none
          ${(!isReady || disabled) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          overflow-hidden group
        `}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {loading ? (
            <div className="flex gap-1 items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-3 border-charcoal border-t-transparent rounded-full"
              />
              <span>Executing via MetaMask...</span>
            </div>
          ) : (
            <>
              <span className="text-2xl">EXEC</span>
              {label}
            </>
          )}
        </span>

        {/* Pulse effect only when ready */}
        {isReady && !disabled && !loading && (
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-white"
          />
        )}
      </motion.button>
    </div>
  );
};

export default SafeExecuteButton;
