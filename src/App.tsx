import { IconCurrentLocation } from '@tabler/icons-react';
import { Geolocation } from 'ol';
import { useState } from 'react';
import { GikadaiMap } from './GikadaiMap';
import type {} from './components/SearchBar';

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
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  console.log(building);

  return (
    <>
      <GikadaiMap
        onClick={(feature) => {
          console.log(feature);
          setBuilding(feature.getProperties() as Building);
        }}
        geolocation={geolocation}
      />
      <button
        type="button"
        className={classes.currentLocation}
        onClick={() => {
          if (!geolocation.getTracking()) {
            geolocation.setTracking(true);
          }
        }}
      >
        <IconCurrentLocation size={32} />
      </button>
      {building && (
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
          {building?.children.map((child) => (
            <div key={child.name}>
              <p>{child.name}</p>
              <p>{child.description}</p>
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
      )}
    </>
  );
}

export default App;
