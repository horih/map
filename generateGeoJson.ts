import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { glob } from 'glob';
import { z } from 'zod';

const GeoJSON = z.object({
  type: z.literal('Feature'),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.array(z.number()).length(2),
  }),
  properties: z.object({
    name: z.string(),
    "label:ja": z.string().optional(),
    "label:en": z.string().optional(),
    icon: z.string().optional(),
  }),
});

const features = await Promise.all(
  (await glob(join(import.meta.dirname, 'points/*.geojson'))).map(
    async (path) => {
      const geojson = await readFile(path)
        .then((res) => res.toString())
        .then((res) => JSON.parse(res));
      return GeoJSON.parse(geojson);
    },
  ),
);

await writeFile(
  join(import.meta.dirname, 'public/points.geojson'),
  JSON.stringify({
    type: 'FeatureCollection',
    features,
  }),
);
