import { useContext } from 'react';
import { SwarmContext } from './swarmContext';

export const useSwarm = () => useContext(SwarmContext);
