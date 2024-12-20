import { LngLatBounds } from 'maplibre-gl';
import {
  AttributionControl,
  GeolocateControl,
  Layer,
  Map as MapLibre,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';
import { LanguageControl } from './components/LanguageControl';
import { PointsLayer } from './components/PointsLayer';

import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';

export function App() {
  const bounds = new LngLatBounds(
    [137.401885986328, 34.6975902563304],
    [137.415618896484, 34.7043644344585],
  );
  const maxBounds = new LngLatBounds(
    [
      bounds.getWest() - (bounds.getEast() - bounds.getWest()) / 2,
      bounds.getSouth() - (bounds.getNorth() - bounds.getSouth()) / 2,
    ],
    [
      bounds.getEast() + (bounds.getEast() - bounds.getWest()) / 2,
      bounds.getNorth() + (bounds.getNorth() - bounds.getSouth()) / 2,
    ],
  );

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
      <LanguageControl />
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

      <PointsLayer />
    </MapLibre>
  );
}
