import React from 'react';
import { motion } from 'framer-motion';

const SwarmingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative w-24 h-24">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <div 
              className="w-12 h-12 border-3 border-charcoal bg-solar shadow-brutal"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                transform: `translateX(${20}px) rotate(${i * 120}deg)`
              }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-2xl font-black uppercase tracking-widest italic"
      >
        Swarming...
      </motion.div>
    </div>
  );
};

export default SwarmingLoader;
