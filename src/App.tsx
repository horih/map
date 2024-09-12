import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import { Tile } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { useMemo, useState } from 'react';
import json from './assets/map.json';
import { OlFeature } from './components/OlFeature';
import { OlLayer } from './components/OlLayer';
import { OlMap } from './components/OlMap';
import { type Building, SearchBar } from './components/SearchBar';

function App() {
  const [building, setBuilding] = useState<Building | null>(null);
  const [buildings, _] = useState<Building[]>(json.buildings);
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
        <OlLayer builder={() => new Tile({ source: new OSM() })} />
        <OlLayer
          builder={() => new VectorLayer({ source: new VectorSource() })}
        >
          {buildings.map((building) => (
            <OlFeature
              key={building.name}
              builder={() =>
                new Feature({
                  geometry: new Point([
                    building.position.x,
                    building.position.y,
                  ]).transform('EPSG:4326', 'EPSG:3857'),
                  name: building.name,
                })
              }
              onClick={() => {
                setIsPanelOpen(true);
                setBuilding(building);
              }}
            />
          ))}
        </OlLayer>
      </OlMap>
    ),
    [buildings],
  );

  return (
    <div className="relative h-dvh overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-10">
        <SearchBar
          onSelect={(e) => {
            setBuilding(e);
          }}
        />
      </div>
      <div className="relative h-full">{olMapMemo}</div>
      {isPanelOpen && (
        <div className="absolute top-0 left-0 h-full w-1/3 bg-white shadow-lg z-20 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{building?.name}</h2>
          <p>{building?.description}</p>
          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
