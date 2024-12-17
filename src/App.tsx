import {
  Map as MapLibre,
  Layer,
  Source,
  ScaleControl,
  NavigationControl,
  GeolocateControl,
  AttributionControl,
} from 'react-map-gl/maplibre';
import { CampusMapIcons } from './components/CampusMapIcons';

import 'maplibre-gl/dist/maplibre-gl.css';

export function App() {
  return (
    <MapLibre
      initialViewState={{
        longitude: 137.41032760122982,
        latitude: 34.7011994290326, // starting position [lng, lat]
        zoom: 15, // starting zoom
        fitBoundsOptions: {},
      }}
      style={{ width: '100dvw', height: '100dvh' }}
      //maxBounds={[[137.41032760122982, 34.7011994290326], [137.41032760122982, 34.7011994290326]]}
      mapStyle={{
        version: 8,
        sources: {},
        layers: [],
        glyphs: 'https://glyphs.geolonia.com/{fontstack}/{range}.pbf',
      }}
      attributionControl={false}
    >
      <ScaleControl />
      <NavigationControl />
      <GeolocateControl />
      <AttributionControl
        compact={true}
        customAttribution="国土地理院ベクトルタイルを加工して作成"
      />
      <CampusMapIcons />
      <Layer
        type="background"
        paint={{ 'background-color': 'rgb(239,239,239)' }}
      />
      <Source type="geojson" data="/78.geojson">
        <Layer type="fill" paint={{ 'fill-color': 'rgb(230, 230, 230)' }} />
        <Layer type="line" paint={{ 'line-color': 'gray' }} />
      </Source>
      <Source type="geojson" data="/546.geojson">
        <Layer type="fill" paint={{ 'fill-color': 'rgb(223, 208, 216)' }} />
      </Source>
      <Source type="geojson" data="/buildings.geojson">
        <Layer
          type="symbol"
          layout={{
            'icon-image': ['coalesce', ['get', 'icon'], 'default'],
            'text-field': ['format', ['get', 'name'], { 'font-scale': 0.8 }],
            'text-font': ['Noto Sans CJK JP Regular'],
            'text-offset': [0, 1],
            'text-anchor': 'top',
          }}
        />
      </Source>
    </MapLibre>
  );
}
