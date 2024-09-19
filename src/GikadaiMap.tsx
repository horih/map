import {
  Feature,
  type Geolocation,
  type MapBrowserEvent,
  Map as OlMap,
  View,
} from 'ol';
import type { FeatureLike } from 'ol/Feature';
import { GeoJSON } from 'ol/format';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { transform } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Circle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import { useEffect, useRef } from 'react';

import streets from './assets/78.json';
import buildings from './assets/546.json';
import json from './assets/result.json';

const currentPositionFeature = new Feature();
currentPositionFeature.setStyle(
  new Style({
    image: new Circle({
      radius: 12,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 4,
      }),
    }),
  }),
);

export function GikadaiMap({
  onClick,
  geolocation,
}: { onClick: (feature: FeatureLike) => void; geolocation: Geolocation }) {
  const buildingsaaa = Object.values(json);
  const container = useRef<HTMLDivElement>(null);

  geolocation.on('change:position', () => {
    const coordinates = geolocation.getPosition();
    currentPositionFeature.setGeometry(
      coordinates ? new Point(coordinates) : undefined,
    );
  });

  useEffect(() => {
    const map = new OlMap({
      controls: [],
      view: new View({
        center: transform([137.408, 34.7016], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17, //ズームレベル
        minZoom: 16, //最小ズームレベル
        maxZoom: 19,
      }),
      layers: [
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(streets).map((feature) => {
              feature.getGeometry()?.transform('EPSG:4326', 'EPSG:3857');
              return feature;
            }),
          }),
          style: new Style({
            stroke: new Stroke({
              color: 'gray',
              width: 1,
            }),
            fill: new Fill({
              color: 'rgb(230, 230, 230)',
            }),
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(buildings).map((feature) => {
              feature.getGeometry()?.transform('EPSG:4326', 'EPSG:3857');
              return feature;
            }),
          }),
          style: new Style({
            stroke: new Stroke({
              color: 'gray',
              width: 1,
            }),
            fill: new Fill({
              color: 'rgb(223, 208, 216)',
            }),
          }),
        }),

        new VectorLayer({
          source: new VectorSource({
            features: buildingsaaa.map((unit) => {
              const feature = new Feature({
                geometry: new Point([
                  unit.coordinates.latitude,
                  unit.coordinates.longitude,
                ]).transform('EPSG:4326', 'EPSG:3857'),
              });

              feature.setStyle(
                new Style({
                  image: new RegularShape({
                    fill: new Fill({
                      color: '#3399CC',
                    }),
                    stroke: new Stroke({
                      color: '#fff',
                      width: 2,
                    }),
                    points: 4,
                    radius: 24,
                    angle: Math.PI / 4,
                  }),
                  text: new Text({
                    text: '99',
                    fill: new Fill({
                      color: '#000000',
                    }),
                    font: 'bold 20px sans-serif',
                  }),
                }),
              );
              return feature;
            }),
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [currentPositionFeature],
          }),
        }),
      ],
    });
    if (container.current) {
      map.setTarget(container.current);
    }

    map.on('click', (e: MapBrowserEvent<UIEvent>) => {
      const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => {
        return feature;
      });
      if (feature !== void 0) {
        onClick(feature);
      }
    });

    return () => {
      map.dispose();
    };
  }, [onClick, buildingsaaa.map]);

  return (
    <div
      style={{
        width: '100dvh',
        height: '100dvh',
      }}
      ref={container}
    />
  );
}
