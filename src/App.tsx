import {
  Map as MapLibre,
  Layer,
  Source,
  ScaleControl,
  NavigationControl,
  GeolocateControl,
  AttributionControl,
  type LngLatBoundsLike,
} from 'react-map-gl/maplibre';
import { CampusMapIcon } from './components/CampusMapIcon';
import {
  IconArcheryArrow,
  IconBallBaseball,
  IconBallBasketball,
  IconBallTennis,
  IconBarbellFilled,
  IconBook,
  IconBusStop,
  IconHome,
  IconLetterA,
  IconLetterB,
  IconLetterC,
  IconLetterD,
  IconLetterE,
  IconLetterF,
  IconLetterG,
  IconMapPin,
  IconMotorbike,
  IconParking,
  IconRun,
  IconStethoscope,
  IconSwimming,
  IconToolsKitchen2,
  IconTrees,
} from '@tabler/icons-react';

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

      <CampusMapIcon id="default" icon={IconMapPin} />

      <CampusMapIcon id="a_building" color="#A12E2A" icon={IconLetterA} />
      <CampusMapIcon id="b_building" color="#D88535" icon={IconLetterB} />
      <CampusMapIcon id="c_building" color="#377641" icon={IconLetterC} />
      <CampusMapIcon id="d_building" color="#1E3368" icon={IconLetterD} />
      <CampusMapIcon id="e_building" color="#2B66B1" icon={IconLetterE} />
      <CampusMapIcon id="f_building" color="#814A8C" icon={IconLetterF} />
      <CampusMapIcon id="g_building" color="#201816" icon={IconLetterG} />

      <CampusMapIcon id="dormitory" icon={IconHome} />
      <CampusMapIcon id="park" icon={IconTrees} />
      <CampusMapIcon id="tennis" icon={IconBallTennis} />
      <CampusMapIcon id="training_gym" icon={IconBarbellFilled} />
      <CampusMapIcon id="bus_stop" icon={IconBusStop} />
      <CampusMapIcon id="pool" icon={IconSwimming} />
      <CampusMapIcon id="kyudo" icon={IconArcheryArrow} />
      <CampusMapIcon id="health_care" icon={IconStethoscope} />
      <CampusMapIcon id="gym" icon={IconBallBasketball} />
      <CampusMapIcon id="bicycle_parking" icon={IconMotorbike} />
      <CampusMapIcon id="parking" icon={IconParking} />
      <CampusMapIcon id="library" icon={IconBook} />
      <CampusMapIcon id="canteen" icon={IconToolsKitchen2} />
      <CampusMapIcon id="baseball" icon={IconBallBaseball} />
      <CampusMapIcon id="athletic" icon={IconRun} />

      <Layer type="background" paint={{ 'background-color': '#EFEFEF' }} />
      <Source type="geojson" data="/streets_original.geojson">
        <Layer type="fill" paint={{ 'fill-color': '#E6E6E6' }} />
        <Layer type="line" paint={{ 'line-color': '#8B8B8B' }} />
      </Source>
      <Source type="geojson" data="/buildings_original.geojson">
        <Layer type="fill" paint={{ 'fill-color': '#DFD0D8' }} />
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
