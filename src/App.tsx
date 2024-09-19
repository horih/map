import { IconCurrentLocation } from '@tabler/icons-react';
import { Geolocation } from 'ol';
import { useMemo, useRef, useState } from 'react';
import { GikadaiMap } from './GikadaiMap';
import { Point, type SimpleGeometry } from 'ol/geom';
import { Map as OlMap } from 'ol';

import classes from './App.module.css';

const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: 'EPSG:3857',
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

  const gikadaiMap = useMemo(
    () => (
      <GikadaiMap
        onClick={(event) => {
          const feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            (feature) => {
              return feature;
            },
          );
          if (feature?.get('children')) {
            const geometry = feature.getGeometry() as SimpleGeometry;
            event.map.getView().fit(geometry, { duration: 500 });
            setBuilding(feature.getProperties() as Building);
          }
        }}
        geolocation={geolocation}
        tracking={tracking}
        ref={mapref}
      />
    ),
    [],
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

      <div className={`${classes.slide} ${building ? classes.slideAnim : ''}`}>
        <div
          style={{
            maxWidth: '800px',
            height: '100%',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '1rem 1rem 0 0',
            padding: '1rem',
            margin: '0 auto',
            border: 'solid 1px #aaa',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem', // text-xl
              fontWeight: 'bold', // font-bold
              marginTop: 0,
              marginBottom: '1rem', // mb-4
            }}
          >
            {building?.name}
          </h2>
          {building?.children.map((child) => (
            <div
              key={child.name}
              style={{ borderRadius: '0.8rem', border: 'solid 1px #aaa' }}
            >
              <p>{child.name}</p>
              {/* <p>{child.description}</p> */}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setBuilding(undefined)}
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
      </div>
    </>
  );
}

export default App;
