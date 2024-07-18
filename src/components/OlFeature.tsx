import { Feature, MapBrowserEvent } from "ol";
import { useEffect } from "react";
import { useOlMap } from "./OlMapContext";
import { useOlLayer } from "./OlLayerContext";
import VectorLayer from "ol/layer/Vector";
import { FeatureLike } from "ol/Feature";

interface Props {
  feature: Feature;
  onClick?: () => void;
}

export function OlFeature({ feature, onClick }: Props) {
  const map = useOlMap();
  const layer = useOlLayer(VectorLayer<FeatureLike>);

  useEffect(() => {
    layer.getSource()?.addFeature(feature);
    const listener = (e: MapBrowserEvent<UIEvent>) => {
      const f = map.forEachFeatureAtPixel(e.pixel, (feature) => {
        return feature;
      });
      if (f === feature && onClick) {
        onClick();
      }
    };
    map.on("click", listener);

    return () => {
      map.un("click", listener);
      layer.getSource()?.removeFeature(feature);
    };
  }, [feature, map, onClick, layer]);

  return null;
}
