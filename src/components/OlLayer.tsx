import { useEffect } from "react";
import { useOlMap } from "./OlMapContext";
import { OlLayerContext } from "./OlLayerContext";
import BaseLayer from "ol/layer/Base";

interface Props {
  layer: BaseLayer;
}

export function OlLayer({ layer, children }: React.PropsWithChildren<Props>) {
  const map = useOlMap();

  useEffect(() => {
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, [layer, map]);

  return (
    <OlLayerContext.Provider value={layer}>{children}</OlLayerContext.Provider>
  );
}
