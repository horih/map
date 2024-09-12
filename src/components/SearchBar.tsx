import { useEffect, useState } from 'react';
import json from '../assets/result.json';

export interface Building {
  name: string;
  description: string;
  facilities: string[];
  coordinates: { latitude: number; longitude: number };
}

function contain_all_char(name: string, word: string) {
  const name_set = new Set(name.toLowerCase());
  for (let i = 0; i < word.length; i++) {
    if (
      !name_set.has(word[i].toLowerCase()) &&
      word[i] !== ' ' &&
      word[i] !== '　'
    ) {
      return false;
    }
  }
  return true;
}

interface SearchBarProps {
  onSelect: (building: Building | null) => void;
}

export function SearchBar(props: SearchBarProps) {
  const buildings = Object.values(json);
  const [word, setWord] = useState<string>('');
  const [res, setRes] = useState<Building[]>([]);
  const [select, setSelet] = useState<Building | null>(null);

  useEffect(() => {
    if (word === '') {
      setRes([]);
    } else {
      const result = buildings.filter((building) => {
        return (
          contain_all_char(building.name.toLowerCase(), word.toLowerCase()) ||
          contain_all_char(
            building.description.toLowerCase(),
            word.toLowerCase(),
          )
        );
      });
      setRes(result);
    }
  }, [word, buildings]);

  return (
    <>
      <form
        autoComplete="off"
        style={{ maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <label
          style={{
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#111827',
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        >
          Search
        </label>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0.75rem',
              pointerEvents: 'none',
            }}
          >
            <svg
              style={{
                width: '1rem',
                height: '1rem',
                color: '#6B7280', // text-gray-500
              }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            style={{
              display: 'block', // block
              width: '100%', // w-full
              padding: '1rem', // p-4
              paddingInlineStart: '2.5rem', // ps-10 (padding-left)
              fontSize: '0.875rem', // text-sm
              color: '#111827', // text-gray-900
              border: '1px solid #d1d5db', // border & border-gray-300
              borderRadius: '0.5rem', // rounded-lg
              backgroundColor: '#f9fafb', // bg-gray-50
              // focus:ring & focus:border (handled dynamically or with additional logic for focus states)
            }}
            placeholder="Search..."
            required
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              setSelet(null);
            }}
          />
        </div>
        <div>
          {select === null && res.length !== 0 && (
            <ul
              style={{
                backgroundColor: '#f9fafb', // bg-gray-50
                border: '1px solid #d1d5db', // border & border-gray-300
                color: '#111827', // text-gray-900
                fontSize: '0.875rem', // text-sm
                borderRadius: '0.5rem', // rounded-lg
                display: 'block', // block
                width: '100%', // w-full
                padding: '0.625rem', // p-2.5 (padding = 2.5/4 = 0.625rem)
                // Dark mode and focus states are typically managed with className or additional logic
              }}
            >
              {res.map((building) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <li
                  key={building.name}
                  onClick={(_) => {
                    setSelet(building);
                    setWord(building.name);
                    props.onSelect(building);
                  }}
                >
                  {building.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
}
