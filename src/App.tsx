import { IconLanguageHiragana } from '@tabler/icons-react';
import { LngLatBounds } from 'maplibre-gl';
import {
  AttributionControl,
  GeolocateControl,
  Layer,
  type LngLatBoundsLike,
  Map as MapLibre,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';
import { ButtonControlGroup } from './ButtonControlGroup';
import { useLocalStorage } from './useLocalStorage';

import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

export function App() {
  const bounds = new LngLatBounds(
    [137.401885986328, 34.6975902563304],
    [137.415618896484, 34.7043644344585],
  );
  /* const bounds = [
    [137.401885986328, 34.6975902563304],
    [137.415618896484, 34.7043644344585],
  ] as const; */

  const maxBounds: LngLatBoundsLike = [
    [
      bounds.getWest() - (bounds.getEast() - bounds.getWest()) / 2,
      bounds.getSouth() - (bounds.getNorth() - bounds.getSouth()) / 2,
    ],
    [
      bounds.getEast() + (bounds.getEast() - bounds.getWest()) / 2,
      bounds.getNorth() + (bounds.getNorth() - bounds.getSouth()) / 2,
    ],
  ];

  const [language, setLanguage] = useLocalStorage('language', 'ja');
  document.documentElement.lang = language;

  return (
    <MapLibre
      style={{ width: '100dvw', height: '100dvh' }}
      mapStyle={{
        version: 8,
        sources: {},
        layers: [],
        glyphs: 'https://glyphs.geolonia.com/{fontstack}/{range}.pbf',
        sprite: '/sprite',
      }}
      initialViewState={{
        bounds: bounds,
      }}
      maxBounds={maxBounds}
      attributionControl={false}
    >
      <ButtonControlGroup position="top-left">
        <button
          type="button"
          onClick={() =>
            setLanguage((language) => (language === 'en' ? 'ja' : 'en'))
          }
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconLanguageHiragana color="#333" />
        </button>
      </ButtonControlGroup>
      <ScaleControl position="bottom-left" />
      <AttributionControl
        position="bottom-right"
        compact={true}
        customAttribution="国土地理院ベクトルタイルを加工して作成"
      />
      <GeolocateControl
        position="bottom-right"
        positionOptions={{
          enableHighAccuracy: true,
        }}
        trackUserLocation={true}
        fitBoundsOptions={{
          maxZoom: 18,
        }}
      />
      <NavigationControl position="bottom-right" />

      <Layer type="background" paint={{ 'background-color': '#F6F8FA' }} />
      <Source type="geojson" data="/terrains.geojson">
        <Layer type="fill" paint={{ 'fill-color': '#CCF0D7' }} />
      </Source>
      <Source type="geojson" data="/streets.geojson">
        <Layer type="fill" paint={{ 'fill-color': '#E6E6E6' }} />
        <Layer type="line" paint={{ 'line-color': '#8B8B8B' }} />
      </Source>
      <Source type="geojson" data="/buildings.geojson">
        <Layer type="fill" paint={{ 'fill-color': '#DFD0D8' }} />
      </Source>
      <Source type="geojson" data="/points.geojson">
        <Layer
          type="symbol"
          layout={{
            'icon-image': ['coalesce', ['get', 'icon'], 'default'],
            'text-field': [
              'format',
              ['coalesce', ['get', `label:${language}`], ['get', 'label:ja']],
              { 'font-scale': 0.8 },
            ],
            'text-font': ['Noto Sans CJK JP Regular'],
            'text-offset': [0, 1],
            'text-anchor': 'top',
          }}
        />
      </Source>
    </MapLibre>
  );
}
