// Safe execute button component
import React from 'react';
import { motion } from 'framer-motion';

const SafeExecuteButton = ({ onClick, disabled, loading }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: -2, y: -2 }}
      whileTap={{ scale: 0.98, x: 2, y: 2 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative w-full py-4 px-8 text-2xl font-black uppercase tracking-wider
        bg-solar text-charcoal border-3 border-charcoal shadow-brutal
        hover:shadow-brutal-hover active:shadow-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        overflow-hidden group
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {loading ? (
          <div className="flex gap-1">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-6 h-6 border-3 border-charcoal border-t-transparent rounded-full"
            />
            <span>Executing...</span>
          </div>
        ) : (
          <>
            <span className="text-3xl">EXEC</span>
            Safe Execute
          </>
        )}
      </span>
      
      {/* Pulse effect for enabled state */}
      {!disabled && !loading && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-white"
        />
      )}
    </motion.button>
  );
};

export default SafeExecuteButton;
