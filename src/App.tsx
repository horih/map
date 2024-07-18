import { SearchBar, Building } from "./components/SearchBar";
import { Point } from "ol/geom";
import { OlMap } from "./components/OlMap";
import { Feature, Map, View } from "ol";
import { OSM } from "ol/source";
import { Tile } from "ol/layer";
import { OlFeature } from "./components/OlFeature";
import { OlLayer } from "./components/OlLayer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useState } from "react";
import { transform } from "ol/proj";

const map = new Map({
  view: new View({
    center: transform([137.408, 34.7016], "EPSG:4326", "EPSG:3857"),
    zoom: 17, //ズームレベル
    minZoom: 16, //最小ズームレベル
    maxZoom: 18,
  }),
});
function App() {
  const [building, setBuilding] = useState<Building | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="relative h-dvh overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-10">
        <SearchBar
          onSelect={(e) => {
            setBuilding(e);
          }}
        />
      </div>
      <div className="relative h-full">
        <OlMap
          map={map}
          onClick={() => {
            alert("feature以外をクリック");
          }}
        >
          <OlLayer layer={new Tile({ source: new OSM() })}></OlLayer>
          <OlLayer layer={new VectorLayer({ source: new VectorSource() })}>
            <OlFeature
              feature={
                new Feature({
                  geometry: new Point([137.410785, 34.7014612]).transform(
                    "EPSG:4326",
                    "EPSG:3857"
                  ),
                  name: "A講義棟",
                })
              }
              onClick={() => {
                setIsPanelOpen(true);
              }}
            />
            <OlFeature
              feature={
                new Feature({
                  geometry: new Point([137.4106308, 34.7019698]).transform(
                    "EPSG:4326",
                    "EPSG:3857"
                  ),
                  name: "A2講義棟",
                })
              }
              onClick={() => {
                setIsPanelOpen(true);
              }}
            />
          </OlLayer>
        </OlMap>
      </div>
      {isPanelOpen && (
        <div className="absolute top-0 left-0 h-full w-1/4 bg-white shadow-lg z-20 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{building?.name}</h2>
          <p>{building?.description}</p>
          <button
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
