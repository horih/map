import { Map, MapBrowserEvent } from "ol";
import React, { useEffect, useRef } from "react";
import { OlMapContext } from "./OlMapContext";

import "ol/ol.css";

interface Props {
  map?: Map;
  onClick?: () => void;
}

export function OlMap({
  map = new Map(),
  onClick,
  children,
}: React.PropsWithChildren<Props>) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      map.setTarget(container.current);
    }
  }, [map]);

  useEffect(() => {
    const listener = (e: MapBrowserEvent<UIEvent>) => {
      const f = map.forEachFeatureAtPixel(e.pixel, (feature) => {
        return feature;
      });
      if (!f && onClick) {
        onClick();
      }
    };
    map.on("click", listener);

    return () => {
      map.un("click", listener);
    };
  }, [map, onClick]);

  return (
    <OlMapContext.Provider value={map}>
      <div ref={container} style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </OlMapContext.Provider>
  );
}
