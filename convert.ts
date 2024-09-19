import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

for (const path of await glob(
  join(import.meta.dirname, 'buildings/*.geojson'),
)) {
  const geojson = await readFile(path)
    .then((res) => res.toString())
    .then((res) => JSON.parse(res));
  console.log(geojson);
}

/* const map = await fs
  .readFile(path)
  .then((res) => res.toString())
  .then((res) => JSON.parse(res));

await fs.writeFile(
  'src/assets/result.json',
  JSON.stringify(Object.fromEntries(await create_map(map.buildings))),
);
 */
