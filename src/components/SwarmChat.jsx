import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Radio, Brain, Zap, ShieldCheck } from 'lucide-react';
import { useSwarm } from '../context/SwarmContext';

const SwarmChat = () => {
  const { messages, addMessage } = useSwarm();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input);
    setInput('');
  };

  const getAgentStyles = (type) => {
    switch (type) {
      case 'listener': return { color: 'bg-solar', icon: <Radio className="w-5 h-5" />, name: 'Listener' };
      case 'analyst': return { color: 'bg-peach', icon: <Brain className="w-5 h-5" />, name: 'Analyst' };
      case 'executor': return { color: 'bg-vibrant text-white', icon: <Zap className="w-5 h-5" />, name: 'Executor' };
      case 'user': return { color: 'bg-charcoal text-white', icon: <User className="w-5 h-5" />, name: 'You' };
      default: return { color: 'bg-charcoal text-white', icon: <ShieldCheck className="w-5 h-5" />, name: 'Swarm' };
    }
  };

  return (
    <div className="flex flex-col h-full brutal-card bg-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b-3 border-charcoal bg-solar font-black uppercase flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          Lumina-Swarm Network
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> AXL P2P</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> 0G COMPUTE</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-cream/5">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const styles = getAgentStyles(msg.type);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-12 h-12 flex-shrink-0 border-3 border-charcoal shadow-[4px_4px_0px_#2F2F2F] flex items-center justify-center rounded-lg ${styles.color}`}>
                  {styles.icon}
                </div>

                <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-charcoal/60">{styles.name}</span>
                    {msg.type !== 'user' && <span className="text-[8px] font-black text-green-600 bg-green-100 px-1 border border-green-600 rounded">LIVE ✓</span>}
                  </div>
                  <div className={`p-4 border-3 border-charcoal shadow-[5px_5px_0px_#2F2F2F] font-bold text-sm leading-relaxed rounded-xl ${msg.type === 'user' ? 'bg-peach' : 'bg-white'}`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t-3 border-charcoal bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Issue command to swarm..."
            className="flex-1 p-4 border-3 border-charcoal focus:outline-none font-bold text-sm rounded-xl"
          />
          <button type="submit" className="brutal-btn bg-vibrant px-6 text-white rounded-xl">
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SwarmChat;
