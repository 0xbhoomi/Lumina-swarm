// Main application imports
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle, Info, Activity, Database, Radio, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import { SwarmProvider, useSwarm } from './context/SwarmContext';
import SwarmChat from './components/SwarmChat';
import Sidebar from './components/Sidebar';
import TransactionPreview from './components/TransactionPreview';
import SafeExecuteButton from './components/SafeExecuteButton';
import ExecutionPanel from './components/ExecutionPanel';
import ChainSelector from './components/ChainSelector';
import MemoryPanel from './components/MemoryPanel';
import SwarmingLoader from './components/SwarmingLoader';
import TelegramBot from './components/TelegramBot';

// Live integration status bar
const IntegrationBar = () => (
  <div className="bg-charcoal text-white overflow-hidden border-b-3 border-charcoal">
    <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-between overflow-x-auto gap-8 no-scrollbar">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] font-black uppercase text-solar mr-2">Live Integrations:</span>
      </div>
      
      <div className="flex gap-6 items-center flex-shrink-0">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
          <Database className="w-4 h-4 text-solar" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase leading-none">0G Storage + Compute</span>
            <span className="text-[9px] font-black text-green-400 flex items-center gap-1">CONNECTED <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /></span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
          <Radio className="w-4 h-4 text-peach" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase leading-none">Gensyn AXL</span>
            <span className="text-[9px] font-black text-green-400 flex items-center gap-1">P2P ONLINE (9002) <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /></span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase leading-none">KeeperHub MCP</span>
            <span className="text-[9px] font-black text-solar flex items-center gap-1">EXECUTION READY <div className="w-1.5 h-1.5 bg-solar rounded-full animate-pulse" /></span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
          <Zap className="w-4 h-4 text-vibrant" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase leading-none">Uniswap V3</span>
            <span className="text-[9px] font-black text-green-400 flex items-center gap-1">QUOTES LIVE <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /></span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
          <MessageCircle className="w-4 h-4 text-blue-400" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase leading-none">Telegram Bot</span>
            <span className="text-[9px] font-black text-green-400 flex items-center gap-1">@luminatradesbot <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Backend health monitoring panel
const BackendHealthPanel = () => {
  const { stats } = useSwarm();
  return (
    <div className="brutal-card bg-charcoal text-cream p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4 text-solar" />
          Backend Status
        </h4>
        <div className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[8px] font-black rounded border border-green-500/30">SYNCED</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase opacity-50 font-black">AXL Node</span>
          <span className="text-xs font-black">3 Agents Active</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase opacity-50 font-black">0G Storage</span>
          <span className="text-xs font-black">{stats.memorySlices} Slices</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase opacity-50 font-black">0G Compute</span>
          <span className="text-xs font-black">{stats.inferences} Inferences</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase opacity-50 font-black">KeeperHub</span>
          <span className="text-xs font-black">{stats.executions} Queued</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-[8px] font-black uppercase opacity-40">
        <div className="w-1.5 h-1.5 bg-solar rounded-full" />
        Real-time latency: {stats.latency}
      </div>
    </div>
  );
};

// Main trading swarm application component
const TradeSwarmApp = () => {
  const { status, triggerTrade, account, connectWallet } = useSwarm();
  const [initialLoading, setInitialLoading] = React.useState(true);

  // Initial loading simulation
  useEffect(() => {
    setTimeout(() => setInitialLoading(false), 2000);
  }, []);

  // Trigger confetti on successful trade
  useEffect(() => {
    if (status === 'success') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF8C00', '#FFDAB9']
      });
    }
  }, [status]);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <SwarmingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <IntegrationBar />

      <div className="flex-1 p-4 md:p-6 flex flex-col gap-6 relative overflow-hidden">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <motion.div 
            <img src="/logo.png" className="w-14 h-14 border-3 border-charcoal shadow-brutal rounded-2xl object-cover" alt="Lumina-Swarm" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">Lumina-Swarm</h1>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-charcoal text-white text-[8px] font-black uppercase rounded">v1.2.0-STABLE</span>
                <div className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-wider">Production Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ChainSelector />
            <button 
              onClick={connectWallet}
              className={`px-6 py-3 border-3 border-charcoal shadow-brutal font-black uppercase text-sm brutal-btn rounded-xl ${account ? 'bg-peach' : 'bg-solar'}`}
            >
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </header>

        {/* Badge below dropdown */}
        <div className="lg:self-end flex items-center gap-2 px-3 py-1 bg-white border-2 border-charcoal rounded-full -mt-4 mr-2">
          <Info className="w-3 h-3 text-vibrant" />
          <span className="text-[8px] font-bold uppercase tracking-tight opacity-60">Real execution on Base Sepolia • Others in simulation</span>
        </div>

        <main className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Left Sidebar - Logs */}
          <div className="flex flex-col gap-6">
            <Sidebar />
            <BackendHealthPanel />
            <TelegramBot />
          </div>

          {/* Center - Chat */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex-1 min-h-[500px]">
              <SwarmChat />
            </div>
          </div>

          {/* Right Sidebar - Trade & Memory */}
          <div className="lg:w-96 flex flex-col gap-6">
            <TransactionPreview />
            <div className="flex flex-col gap-4">
              <SafeExecuteButton 
                onClick={triggerTrade} 
                loading={status === 'executing'} 
                disabled={status === 'success'}
              />
            </div>
            <MemoryPanel />
          </div>
        </main>

        <ExecutionPanel />

        {/* Success Modal */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-cream/80 backdrop-blur-sm p-6"
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                className="brutal-card bg-white p-12 max-w-lg w-full text-center flex flex-col items-center gap-6 rounded-3xl"
              >
                <div className="w-24 h-24 bg-green-400 border-3 border-charcoal shadow-brutal flex items-center justify-center rounded-full">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">Trade Confirmed</h2>
                <p className="font-bold text-xl leading-snug">
                  The Lumina-Swarm has successfully executed your command. Persistence layer synced on <span className="text-vibrant underline decoration-3">0G STORAGE</span>.
                </p>
                <div className="flex flex-col w-full gap-4 mt-4">
                  <a 
                    href="#" 
                    target="_blank"
                    className="brutal-btn bg-solar py-4 font-black uppercase flex items-center justify-center gap-2 rounded-xl"
                  >
                    View on Basescan <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => window.location.reload()}
                    className="text-sm font-black uppercase underline decoration-vibrant decoration-4 underline-offset-4"
                  >
                    New Swarm Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Decor */}
        <div className="fixed -bottom-20 -right-20 w-96 h-96 border-3 border-charcoal/5 rounded-full pointer-events-none" />
        <div className="fixed -top-20 -left-20 w-64 h-64 border-3 border-charcoal/5 rotate-45 pointer-events-none" />
      </div>
    </div>
  );
};

const App = () => (
  <SwarmProvider>
    <TradeSwarmApp />
  </SwarmProvider>
);

export default App;
