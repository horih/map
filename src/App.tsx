import { IconCurrentLocation, IconX } from "@tabler/icons-react";
import { Geolocation } from "ol";
import { useMemo, useRef, useState, useEffect } from "react";
import { GikadaiMap } from "./GikadaiMap";
import { Point, type SimpleGeometry } from "ol/geom";
import { Map as OlMap } from "ol";

import classes from "./App.module.css";

const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: "EPSG:3857",
});

interface Children {
  name: string;
  description: string;
}

interface Building {
  id: number;
  name: string;
  children: Children[];
}

function App() {
  const [building, setBuilding] = useState<Building>();
  /* const [currentPosition, setCurrentPosition] = useState();

  geolocation.on('change:position', () => {
    const coordinates = geolocation.getPosition();
    currentPositionFeature.setGeometry(
      coordinates ? new Point(coordinates) : undefined,
    );
  }); */

  const tracking = useRef<boolean>(false);

  const mapref = useRef<React.MutableRefObject<OlMap | undefined>>();
  const [focus_padding, _setPadding] = useState(window.innerHeight * 0.45);

  useEffect(() => {
    _setPadding(window.innerHeight * 0.45);
  }, [window.innerHeight]);

  const gikadaiMap = useMemo(
    () => (
      <GikadaiMap
        onClick={(event) => {
          const feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            (feature) => {
              return feature;
            }
          );
          if (feature?.get("children")) {
            const geometry = feature.getGeometry() as SimpleGeometry;
            event.map.getView().fit(geometry, {
              duration: 500,
              padding: [0, 0, focus_padding, 0],
            });
            setBuilding(feature.getProperties() as Building);
          }
        }}
        geolocation={geolocation}
        tracking={tracking}
        ref={mapref}
      />
    ),
    []
  );

  return (
    <>
      {gikadaiMap}
      <button
        type="button"
        className={classes.currentLocation}
        onClick={() => {
          if (!geolocation.getTracking()) {
            geolocation.setTracking(true);
          }
          tracking.current = true;
          const coordinates = geolocation.getPosition();
          if (tracking.current && coordinates) {
            mapref.current?.current
              ?.getView()
              .fit(new Point(coordinates), { duration: 500 });
          }
        }}
      >
        <IconCurrentLocation size={32} />
      </button>

      <div className={`${classes.slide} ${building ? classes.slideAnim : ""}`}>
        <div
          style={{
            maxWidth: "800px",
            height: "100%",
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "1rem 1rem 0 0",
            padding: "1rem",
            margin: "0 auto",
            border: "solid 1px #aaa",
            position: "relative",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem", // text-xl
              fontWeight: "bold", // font-bold
              marginTop: 0,
              marginBottom: "1rem", // mb-4
            }}
          >
            {building?.name}
          </h2>
          {building?.children.map((child, index) => (
            <div
              key={child.name}
              className={
                index % 2 === 0 ? classes.slideInLeft : classes.slideInRight
              }
              style={{
                borderRadius: "0.8rem",
                border: "solid 1px #aaa",
              }}
            >
              <p>{child.name}</p>
              {/* <p>{child.description}</p> */}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setBuilding(undefined)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              padding: "0.5rem", // p-2
              backgroundColor: "#ef4444", // bg-red-500
              color: "#ffffff", // text-white
              borderRadius: "0.25rem", // rounded
            }}
          >
            <IconX size={"1rem"} strokeWidth={2} color={"black"} />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
