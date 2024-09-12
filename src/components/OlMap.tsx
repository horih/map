import { Map, type MapBrowserEvent } from 'ol';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { OlMapContext } from './OlMapContext';

import 'ol/ol.css';

interface Props {
  builder: () => Map;
  onClick?: () => void;
}

export function OlMap({
  builder = () => new Map(),
  onClick,
  children,
}: React.PropsWithChildren<Props>) {
  const container = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(builder);

  useEffect(() => {
    const map = builder();
    if (container.current) {
      map.setTarget(container.current);
    }

    const listener = (e: MapBrowserEvent<UIEvent>) => {
      const f = map.forEachFeatureAtPixel(e.pixel, (feature) => {
        return feature;
      });
      if (!f && onClick) {
        onClick();
      }
    };
    map.on('click', listener);

    setMap(map);

    return () => {
      map.un('click', listener);
      map.dispose();
    };
  }, [builder, onClick]);

  return (
    <OlMapContext.Provider value={map}>
      <div ref={container} style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </OlMapContext.Provider>
  );
}
