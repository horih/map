import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

interface INPUT_Building {
  name: string;
  description: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  facilities: INPUT_Building[];
}

interface OUTPUT_Building {
  name: string;
  description: string;
  uuid: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  facilities: string[];
}

function gen_output(
  input: INPUT_Building,
  uuid: string,
  facilityUUIDs: string[],
): OUTPUT_Building {
  return {
    name: input.name,
    description: input.description,
    uuid: uuid,
    coordinates: input.coordinates,
    facilities: facilityUUIDs,
  };
}

async function create_flat_map(
  input: INPUT_Building,
  output: Map<string, OUTPUT_Building>,
): Promise<string> {
  const facilityUUIDs: string[] = [];
  for (const facility of input.facilities) {
    const facilityUUID = await create_flat_map(facility, output);
    facilityUUIDs.push(facilityUUID);
  }

  const uuid = uuidv4();
  const building = gen_output(input, uuid, facilityUUIDs);
  output.set(uuid, building);
  return uuid;
}

async function create_map(
  input: INPUT_Building[],
): Promise<Map<string, OUTPUT_Building>> {
  const output = new Map<string, OUTPUT_Building>();
  for (const building of input) {
    await create_flat_map(building, output);
  }
  return output;
}

const path = 'src/assets/map.json';

const map = await fs
  .readFile(path)
  .then((res) => res.toString())
  .then((res) => JSON.parse(res));

await fs.writeFile(
  'src/assets/result.json',
  JSON.stringify(Object.fromEntries(await create_map(map.buildings))),
);
