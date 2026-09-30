import { useContext } from 'react';
import { SettleInContext } from './SettleInContext';

export const useSettleIn = () => useContext(SettleInContext);
