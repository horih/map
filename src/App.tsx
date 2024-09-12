import { Feature, Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import CircleStyle from 'ol/style/Circle';
import Style from 'ol/style/Style';
import { useMemo, useState } from 'react';
import geojson from './assets/78.json';
import geojson2 from './assets/546.json';
import json from './assets/result.json';
import { OlFeature } from './components/OlFeature';
import { OlLayer } from './components/OlLayer';
import { OlMap } from './components/OlMap';
import { type Building } from './components/SearchBar';
import Geolocation from 'ol/Geolocation.js';

import Fill from 'ol/style/Fill';
import iconSrc from './assets/icon.png';
import Stroke from 'ol/style/Stroke';

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: iconSrc,
  }),
});

function App() {
  const buildings = Object.values(json);
  const [building, setBuilding] = useState<Building | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // map.on("click", (event) => {
  //   const coordinates = event.coordinate;
  //   const point = new Point(coordinates).transform("EPSG:3857", "EPSG:4326");
  //   console.log(point.getFlatCoordinates());
  // });

  const olMapMemo = useMemo(
    () => (
      <OlMap
        builder={() =>
          new Map({
            controls: [],
            view: new View({
              center: transform([137.408, 34.7016], 'EPSG:4326', 'EPSG:3857'),
              zoom: 17, //ズームレベル
              minZoom: 16, //最小ズームレベル
              maxZoom: 19,
            }),
          })
        }
        onClick={() => {
          // alert("feature以外をクリック");
        }}
      >
        {/* <OlLayer builder={() => new Tile({ source: new OSM() })} /> */}
        <OlLayer
          builder={() => {
            const vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojson).map((feature) => {
                feature.getGeometry()?.transform('EPSG:4326', 'EPSG:3857');
                return feature;
              }),
            });

            return new VectorLayer({
              source: vectorSource,
              background: 'rgb(237, 243, 211)',
              style: new Style({
                stroke: new Stroke({
                  color: 'gray',
                  width: 1,
                }),
                fill: new Fill({
                  color: 'rgb(230, 230, 230)',
                }),
              }),
            });
          }}
        />
        <OlLayer
          builder={() => {
            const vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojson2).map((feature) => {
                feature.getGeometry()?.transform('EPSG:4326', 'EPSG:3857');
                return feature;
              }),
            });

            return new VectorLayer({
              source: vectorSource,
              style: new Style({
                stroke: new Stroke({
                  color: 'gray',
                  width: 1,
                }),
                fill: new Fill({
                  color: 'rgb(223, 208, 216)',
                }),
              }),
            });
          }}
        />
        <OlLayer
          builder={() => new VectorLayer({ source: new VectorSource() })}
        >
          <OlFeature
            builder={(map) => {
              const feature = new Feature();

              const geolocation = new Geolocation({
                trackingOptions: {
                  enableHighAccuracy: true,
                },
                projection: map.getView().getProjection(),
              });
              geolocation.setTracking(true);
              geolocation.on('change:position', () => {
                const coordinates = geolocation.getPosition();
                feature.setGeometry(
                  coordinates ? new Point(coordinates) : undefined,
                );
              });

              feature.setStyle(
                new Style({
                  image: new CircleStyle({
                    radius: 20,
                    fill: new Fill({
                      color: '#3399CC',
                    }),
                    stroke: new Stroke({
                      color: '#fff',
                      width: 5,
                    }),
                  }),
                }),
              );
              return feature;
            }}
          />
          {buildings.map((unit) => (
            <OlFeature
              key={unit.name}
              builder={() => {
                const feature = new Feature({
                  geometry: new Point([
                    unit.coordinates.latitude,
                    unit.coordinates.longitude,
                  ]).transform('EPSG:4326', 'EPSG:3857'),
                  name: unit.name,
                });
                feature.setStyle(iconStyle);
                return feature;
              }}
              onClick={(map) => {
                setIsPanelOpen(true);
                setBuilding(unit);
                map
                  .getView()
                  .fit(
                    new Point([
                      unit.coordinates.latitude,
                      unit.coordinates.longitude,
                    ]).transform('EPSG:4326', 'EPSG:3857'),
                    { duration: 500 },
                  );
                //map.getView().setZoom(19);
              }}
            />
          ))}
        </OlLayer>
      </OlMap>
    ),
    [buildings],
  );

  return (
    <div
      style={{
        position: 'relative',
        height: '100dvh', // `h-dvh`はブラウザの100%の動的ビューポート高さ
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {/* <SearchBar
          onSelect={(e) => {
            setBuilding(e);
            setIsPanelOpen(true);
          }}
        /> */}
      </div>
      <div
        style={{
          position: 'relative',
          height: '100%',
        }}
      >
        {olMapMemo}
      </div>
      {isPanelOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '33.3333%',
            backgroundColor: '#ffffff',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 20,
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem', // text-xl
              fontWeight: 'bold', // font-bold
              marginBottom: '1rem', // mb-4
            }}
          >
            {building?.name}
          </h2>
          <p>{building?.description}</p>
          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            style={{
              marginTop: '1rem', // mt-4
              padding: '0.5rem', // p-2
              backgroundColor: '#ef4444', // bg-red-500
              color: '#ffffff', // text-white
              borderRadius: '0.25rem', // rounded
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
