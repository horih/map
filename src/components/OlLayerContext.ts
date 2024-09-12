import type BaseLayer from 'ol/layer/Base';
import { createContext, useContext } from 'react';

export const OlLayerContext = createContext<BaseLayer | null>(null);

export function useOlLayer<T extends BaseLayer>(
  cls: new (...args: never) => T,
) {
  const layer = useContext(OlLayerContext);
  if (!layer) {
    throw new Error('OlLayerContext not found');
  }
  if (!(layer instanceof cls)) {
    throw new Error('Invalid type');
  }
  return layer as T;
}
