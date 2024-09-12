import type { Map } from 'ol';
import { createContext, useContext } from 'react';

export const OlMapContext = createContext<Map | null>(null);

export function useOlMap() {
  const map = useContext(OlMapContext);
  if (!map) {
    throw new Error('OlMapContext not found');
  }
  return map;
}
