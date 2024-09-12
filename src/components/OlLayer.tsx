import type BaseLayer from 'ol/layer/Base';
import { useEffect, useState } from 'react';
import { OlLayerContext } from './OlLayerContext';
import { useOlMap } from './OlMapContext';

interface Props {
  builder: () => BaseLayer;
}

export function OlLayer({ builder, children }: React.PropsWithChildren<Props>) {
  const map = useOlMap();
  const [layer, setLayer] = useState(builder);

  useEffect(() => {
    const layer = builder();
    map.addLayer(layer);
    setLayer(layer);

    return () => {
      map.removeLayer(layer);
      layer.dispose();
    };
  }, [builder, map]);

  return (
    <OlLayerContext.Provider value={layer}>{children}</OlLayerContext.Provider>
  );
}
