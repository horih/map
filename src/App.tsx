import {
  Map as MapLibre,
  Layer,
  Source,
  ScaleControl,
  NavigationControl,
  GeolocateControl,
  AttributionControl,
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
        longitude: 137.41032760122982,
        latitude: 34.7011994290326,
        zoom: 15,
        fitBoundsOptions: {},
      }}
      //maxBounds={[[137.41032760122982, 34.7011994290326], [137.41032760122982, 34.7011994290326]]}
      hash={true}
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
