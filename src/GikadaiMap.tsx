import {
  Feature,
  type Geolocation,
  type MapBrowserEvent,
  Map as OlMap,
  View,
} from 'ol';
import { GeoJSON } from 'ol/format';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { transform } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Circle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import { useEffect, useRef } from 'react';

import streets from './assets/78.json';
import buildingspolygon from './assets/546.json';

function getBuildingBgColor(group: string) {
  switch (group) {
    case 'A棟群':
      return '#A12E2A';
    case 'B棟群':
      return '#D88535';
    case 'C棟群':
      return '#377641';
    case 'D棟群':
      return '#1E3368';
    case 'E棟群':
      return '#FFFFFF';
    case 'F棟群':
      return '#814A8C';
    case 'G棟群':
      return '#8A8A8A';
    default:
      return 'gray';
  }
}

function getBuildingTextColor(group: string) {
  switch (group) {
    case 'A棟群':
    case 'B棟群':
    case 'C棟群':
    case 'D棟群':
    case 'F棟群':
    case 'G棟群':
      return '#FFFFFF';
    case 'E棟群':
      return '#000000';
    default:
      return 'gray';
  }
}

function getBuildingBorderColor(group: string) {
  switch (group) {
    case 'A棟群':
    case 'B棟群':
    case 'C棟群':
    case 'D棟群':
    case 'F棟群':
    case 'G棟群':
      return '#FFFFFF';
    case 'E棟群':
      return '#000000';
    default:
      return 'gray';
  }
}

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
}: {
  onClick: (event: MapBrowserEvent<UIEvent>) => void;
  geolocation: Geolocation;
}) {
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
            features: new GeoJSON()
              .readFeatures(buildingspolygon)
              .map((feature) => {
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
            url: 'buildings.geojson',
            format: new GeoJSON(),
          }),
          style: (feature) => {
            return new Style({
              image: new RegularShape({
                fill: new Fill({
                  color: getBuildingBgColor(feature.get('group')),
                }),
                stroke: new Stroke({
                  color: getBuildingBorderColor(feature.get('group')),
                  width: 2,
                }),
                points: 4,
                radius: 24,
                angle: Math.PI / 4,
              }),
              text: new Text({
                text: feature.get('id').toString(),
                fill: new Fill({
                  color: getBuildingTextColor(feature.get('group')),
                }),
                font: 'bold 20px sans-serif',
              }),
            });
          },
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
      console.log(
        new Point(e.coordinate)
          .transform('EPSG:3857', 'EPSG:4326')
          .getCoordinates(),
      );
      /* console.log(e.)
      const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => {
        return feature;
      }); */

      onClick(e);
    });

    return () => {
      map.dispose();
    };
  }, [onClick]);

  return (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
      }}
      ref={container}
    />
  );
}
