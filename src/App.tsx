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
import { CampusMapIcon } from './components/CampusMapIcon';

import 'maplibre-gl/dist/maplibre-gl.css';

export function App() {
  const bounds = [
    [137.401885986328, 34.6975902563304],
    [137.415618896484, 34.7043644344585],
  ];
  const maxBounds: LngLatBoundsLike = [
    [
      bounds[0][0] - (bounds[1][0] - bounds[0][0]) / 2,
      bounds[0][1] - (bounds[1][1] - bounds[0][1]) / 2,
    ],
    [
      bounds[1][0] + (bounds[1][0] - bounds[0][0]) / 2,
      bounds[1][1] + (bounds[1][1] - bounds[0][1]) / 2,
    ],
  ];
  const center = [
    (bounds[0][0] + bounds[1][0]) / 2,
    (bounds[0][1] + bounds[1][1]) / 2,
  ];

  return (
    <MapLibre
      style={{ width: '100dvw', height: '100dvh' }}
      mapStyle={{
        version: 8,
        sources: {},
        layers: [],
        glyphs: 'https://glyphs.geolonia.com/{fontstack}/{range}.pbf',
      }}
      initialViewState={{
        longitude: center[0],
        latitude: center[1],
      }}
      maxBounds={maxBounds}
      attributionControl={false}
    >
      <NavigationControl />
      <ScaleControl />
      <GeolocateControl />
      <AttributionControl
        compact={true}
        customAttribution="国土地理院ベクトルタイルを加工して作成"
      />

      <CampusMapIcon id="default" />

      <CampusMapIcon id="a_building" />
      <CampusMapIcon id="b_building" />
      <CampusMapIcon id="c_building" />
      <CampusMapIcon id="d_building" />
      <CampusMapIcon id="e_building" />
      <CampusMapIcon id="f_building" />
      <CampusMapIcon id="g_building" />

      <CampusMapIcon id="dormitory" />
      <CampusMapIcon id="park" />
      <CampusMapIcon id="tennis" />
      <CampusMapIcon id="training_gym" />
      <CampusMapIcon id="bus_stop" />
      <CampusMapIcon id="pool" />
      <CampusMapIcon id="kyudo" />
      <CampusMapIcon id="health_care" />
      <CampusMapIcon id="gym" />
      <CampusMapIcon id="bicycle_parking" />
      <CampusMapIcon id="parking" />
      <CampusMapIcon id="library" />
      <CampusMapIcon id="canteen" />
      <CampusMapIcon id="baseball" />
      <CampusMapIcon id="athletic" />

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
      <Source type="geojson" data="/generated/points.geojson">
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
