// Chain selector component
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSwarm } from '../context/useSwarm';

// Available blockchain networks
const chains = [
  { id: 'base-sepolia', name: 'Base Sepolia', asset: 'ETH', pair: 'ETH/USDC', icon: 'BASE' },
  { id: 'eth', name: 'Ethereum Mainnet', asset: 'ETH', pair: 'ETH/USDT', icon: 'ETH' },
  { id: 'bnb', name: 'BNB Smart Chain', asset: 'BNB', pair: 'BNB/USDT', icon: 'BNB' },
  { id: 'sol', name: 'Solana Mainnet', asset: 'SOL', pair: 'SOL/USDC', icon: 'SOL', disabled: true },
];

const ChainSelector = () => {
  const { selectedChain, setSelectedChain } = useSwarm();

  return (
    <div className="relative group">
      <div className="text-[10px] font-black uppercase text-charcoal/60 mb-1 ml-1 flex justify-between">
        <span>Chain & Asset</span>
        {selectedChain.id === 'sol' && <span className="text-vibrant">Coming Soon</span>}
      </div>
      <div className="relative">
        <select
          value={selectedChain.id}
          onChange={(e) => {
            const chain = chains.find(c => c.id === e.target.value);
            if (chain && !chain.disabled) setSelectedChain(chain);
          }}
          className="appearance-none w-full bg-solar border-3 border-charcoal shadow-brutal px-4 py-2 pr-10 font-black uppercase text-sm cursor-pointer focus:outline-none rounded-xl"
        >
          {chains.map((chain) => (
            <option key={chain.id} value={chain.id} disabled={chain.disabled}>
              {chain.icon} {chain.name} ({chain.asset})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
};

export default ChainSelector;
