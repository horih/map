import type { StyleImageInterface, StyleImageMetadata } from 'maplibre-gl';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

interface MapImageProps {
  id: string;
  image:
    | HTMLImageElement
    | ImageBitmap
    | ImageData
    | {
        width: number;
        height: number;
        data: Uint8Array | Uint8ClampedArray;
      }
    | StyleImageInterface;
  options?: Partial<StyleImageMetadata>;
}

export function MapImage({ id, image, options }: MapImageProps) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }
    map.addImage(id, image, options);
    return () => {
      map.removeImage(id);
    };
  }, [id, image, options, map]);

  return null;
}
