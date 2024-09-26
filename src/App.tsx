import {
  IconCurrentLocation,
  IconX,
  IconMapPin,
  IconWorld,
} from "@tabler/icons-react";
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
  url: string;
  src: string;
  room: string;
}

interface Building {
  id: number;
  name: string;
  children: Children[];
}

interface ChildSheetProps {
  child: Children;
  index: number;
  onClick: (child: Children) => void;
}

function ChildSheet({ child, index, onClick }: ChildSheetProps) {
  return (
    <div
      key={index}
      style={{
        maxHeight: "150px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        padding: "1rem",
        margin: "0.5rem 0",
        border: "solid 1px #ddd",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => onClick(child)}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "0.5rem",
          overflow: "hidden",
          marginRight: "1rem",
        }}
      >
        <img
          src={child.src}
          alt={child.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
              color: "#333",
            }}
          >
            {child.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconMapPin
              size={"1.5rem"}
              strokeWidth={2}
              style={{ marginRight: "0.5rem", color: "#333" }}
            />
            <span
              style={{
                fontSize: "1rem",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {child.room}
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "#666",
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
          }}
        >
          {child.description}
        </p>
      </div>
    </div>
  );
}

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
  const [focus_padding, setPadding] = useState(0);

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
          <div
            style={{
              overflow: "auto",
              height: "100%",
              width: "100%",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {building?.children.map((child, index) => (
              <ChildSheet
                child={child}
                index={index}
                onClick={(child: Children) => {
                  setGroup(child);
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setBuilding(undefined);
              setGroup(undefined);
            }}
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
      <div className={`${classes.slide2} ${group ? classes.slideAnim : ""}`}>
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
          <div
            style={{
              overflow: "auto",
              height: "100%",
              width: "100%",
              msOverflowStyle: "none", // For IE and Edge
              scrollbarWidth: "none", // For Firefox
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50%",
              }}
            >
              <img
                src={group?.src}
                alt={group?.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ padding: "1rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: 0,
                  color: "#333",
                }}
              >
                {group?.name}
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  color: "#333",
                  margin: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconWorld
                  size={"1.5rem"}
                  strokeWidth={2}
                  style={{ margin: "0 0.5rem 0 1rem" }}
                />
                <a
                  href={group?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "1rem",
                    color: "#1D4ED8",
                    textDecoration: "none",
                  }}
                >
                  {group?.url}
                </a>
                <IconMapPin
                  size={"1.5rem"}
                  strokeWidth={2}
                  style={{ marginRight: "0.5rem" }}
                />
                {group?.room}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#666",
                  margin: 0,
                }}
              >
                {group?.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setGroup(undefined);
            }}
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
