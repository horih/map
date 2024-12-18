import {
  IconAd,
  IconArcheryArrow,
  IconBallBaseball,
  IconBallBasketball,
  IconBallTennis,
  IconBarbellFilled,
  IconBook,
  IconBusStop,
  IconHome,
  IconLetterA,
  IconLetterB,
  IconLetterC,
  IconLetterD,
  IconLetterE,
  IconLetterF,
  IconLetterG,
  IconMapPin,
  IconMotorbike,
  IconParking,
  IconRun,
  IconStethoscope,
  IconSwimming,
  IconToolsKitchen2,
  IconTrees,
  type TablerIcon,
} from '@tabler/icons-react';
import { renderToString } from 'react-dom/server';
import React from 'react';
import sharp from 'sharp';
import { join } from 'node:path';

async function generateIcon(id: string, Icon: TablerIcon, color = '#8A8A8A') {
  const svg = renderToString(
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <title>{id}</title>
      <rect x="0" y="0" width="32" height="32" rx="8" ry="8" fill={color} />
      <Icon x="4" y="4" color="#FFFFFF" />
    </svg>,
  );
  await sharp(Buffer.from(svg))
    .webp()
    .toFile(join(import.meta.dirname, `public/generated/${id}.webp`));
}

await generateIcon('default', IconMapPin);

await generateIcon('a_building', IconLetterA, '#A12E2A');
await generateIcon('b_building', IconLetterB, '#D88535');
await generateIcon('c_building', IconLetterC, '#377641');
await generateIcon('d_building', IconLetterD, '#1E3368');
await generateIcon('e_building', IconLetterE, '#2B66B1');
await generateIcon('f_building', IconLetterF, '#814A8C');
await generateIcon('g_building', IconLetterG, '#201816');

await generateIcon('dormitory', IconHome);
await generateIcon('park', IconTrees);
await generateIcon('tennis', IconBallTennis);
await generateIcon('training_gym', IconBarbellFilled);
await generateIcon('bus_stop', IconBusStop);
await generateIcon('pool', IconSwimming);
await generateIcon('kyudo', IconArcheryArrow);
await generateIcon('health_care', IconStethoscope);
await generateIcon('gym', IconBallBasketball);
await generateIcon('bicycle_parking', IconMotorbike);
await generateIcon('parking', IconParking);
await generateIcon('library', IconBook);
await generateIcon('canteen', IconToolsKitchen2);
await generateIcon('baseball', IconBallBaseball);
await generateIcon('athletic', IconRun);
