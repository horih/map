import { useEffect, useState } from "react";
import json from "../assets/map.json";

export interface Building {
  name: string;
  description: string;
  facility: string;
  position: { x: number; y: number };
}

function contain_all_char(name: string, word: string) {
  const name_set = new Set(name.toLowerCase());
  for (let i = 0; i < word.length; i++) {
    if (
      !name_set.has(word[i].toLowerCase()) &&
      word[i] !== " " &&
      word[i] !== "　"
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
  const buildings: Building[] = json.buildings;
  const [word, setWord] = useState<string>("");
  const [res, setRes] = useState<Building[]>([]);
  const [select, setSelet] = useState<Building | null>(null);

  useEffect(() => {
    if (word === "") {
      setRes([]);
    } else {
      const result = buildings.filter((building) => {
        return (
          contain_all_char(building.name.toLowerCase(), word.toLowerCase()) ||
          contain_all_char(
            building.facility.toLowerCase(),
            word.toLowerCase()
          ) ||
          contain_all_char(
            building.description.toLowerCase(),
            word.toLowerCase()
          )
        );
      });
      setRes(result);
    }
  }, [word]);

  return (
    <>
      <form autoComplete="off" className="max-w-md mx-auto">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <ul className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {res.map((building) => (
                <li
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
