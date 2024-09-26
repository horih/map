import { IconCurrentLocation } from "@tabler/icons-react";
import { Geolocation } from "ol";
import { useMemo, useRef, useState, useEffect } from "react";
import { GikadaiMap } from "./GikadaiMap";
import { Point, type SimpleGeometry } from "ol/geom";
import { Map as OlMap } from "ol";
import BuildingCard from "./components/BuildingCard";
import GroupCard from "./components/GroupCard";
import { Children } from "./components/Children";
import { Building } from "./components/Building";

import classes from "./App.module.css";

const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: "EPSG:3857",
});

function App() {
  const [building, setBuilding] = useState<Building>();
  const [group, setGroup] = useState<Children>();
  /* const [currentPosition, setCurrentPosition] = useState();

  geolocation.on('change:position', () => {
    const coordinates = geolocation.getPosition();
    currentPositionFeature.setGeometry(
      coordinates ? new Point(coordinates) : undefined,
    );
  }); */

  const tracking = useRef<boolean>(false);
  const mapref = useRef<React.MutableRefObject<OlMap | undefined>>();
  const [focus_padding, setPadding] = useState(window.innerHeight * 0.45);

  useEffect(() => {
    const updatePadding = () => {
      if (building !== undefined) {
        setPadding(window.innerHeight * 0.45);
      } else {
        setPadding(0);
      }
    };
    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => {
      window.removeEventListener("resize", updatePadding);
    };
  }, [building]);

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
            const select = feature.getProperties() as Building;
            if (typeof select.id === "number") {
              setBuilding(select);
              setGroup(undefined);
            }
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
              .fit(new Point(coordinates), { duration: 500, maxZoom: 19 });
          }
        }}
      >
        <IconCurrentLocation size={32} />
      </button>

      <div className={`${classes.slide1} ${building ? classes.slideAnim : ""}`}>
        <BuildingCard
          building={building}
          setBuilding={setBuilding}
          setGroup={setGroup}
        />
      </div>
      <div className={`${classes.slide2} ${group ? classes.slideAnim : ""}`}>
        <GroupCard group={group} setGroup={setGroup} />
      </div>
    </>
  );
}

export default App;
