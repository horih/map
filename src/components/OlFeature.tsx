import type { Feature, Map, MapBrowserEvent } from 'ol';
import type { FeatureLike } from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { useEffect, useState } from 'react';
import { useOlLayer } from './OlLayerContext';
import { useOlMap } from './OlMapContext';

interface Props {
  builder: () => Feature;
  onClick?: (map: Map) => void;
}

export function OlFeature({ builder, onClick }: Props) {
  const map = useOlMap();
  const layer = useOlLayer(VectorLayer<FeatureLike>);
  const [_, setFeature] = useState(builder);

  useEffect(() => {
    const feature = builder();
    layer.getSource()?.addFeature(feature);
    const listener = (e: MapBrowserEvent<UIEvent>) => {
      const f = map.forEachFeatureAtPixel(e.pixel, (feature) => {
        return feature;
      });
      if (f === feature && onClick) {
        onClick(map);
      }
    };
    map.on('click', listener);
    setFeature(feature);

    return () => {
      map.un('click', listener);
      layer.getSource()?.removeFeature(feature);
    };
  }, [onClick, layer, builder, map]);

  return null;
}
