import { useEffect } from 'react';
import { type MapMouseEvent, useMap } from 'react-map-gl/maplibre';

export function CampusMapDebug() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }
    const listener = (e: MapMouseEvent) => {
      console.log(`${e.lngLat.lng}, ${e.lngLat.lat}`);
    };
    map.on('click', listener);
    return () => {
      map.off('click', listener);
    };
  }, [map]);

  return null;
}
