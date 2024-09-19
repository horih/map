import { readFile, writeFile } from 'node:fs/promises';

const resultJson = await readFile('src/assets/result.json')
  .then((res) => res.toString())
  .then((res) => JSON.parse(res));

for (const building of Object.values(resultJson)) {
  console.log(building);
  await writeFile(
    `buildings/${building.name}.geojson`,
    JSON.stringify({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          building.coordinates.latitude,
          building.coordinates.longitude,
        ],
      },
      properties: {
        id: 0,
        name: building.name,
        group: '',
        children: [],
      },
    }),
  );
}
