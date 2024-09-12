import { Feature, MapBrowserEvent } from "ol";
import { useEffect, useState } from "react";
import { useOlMap } from "./OlMapContext";
import { useOlLayer } from "./OlLayerContext";
import VectorLayer from "ol/layer/Vector";
import { FeatureLike } from "ol/Feature";

interface Props {
  builder: ()=>Feature;
  onClick?: () => void;
}

export function OlFeature({ builder, onClick }: Props) {
  const map = useOlMap();
  const layer = useOlLayer(VectorLayer<FeatureLike>);
  const [feature, setFeature] = useState(builder)

  useEffect(() => {
    const feature = builder();
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
    setFeature(feature)

    return () => {
      map.un("click", listener);
      layer.getSource()?.removeFeature(feature);
    };
  }, [onClick, layer, builder, map]);

  return null;
}
