import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
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
import React from 'react';
import { renderToString } from 'react-dom/server';
import tmp from 'tmp';

function generateIcon(Icon: TablerIcon, color = '#8A8A8A') {
  return renderToString(
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="32" height="32" rx="8" ry="8" fill={color} />
      <Icon x="4" y="4" color="#FFFFFF" />
    </svg>,
  );
}

tmp.dir({ unsafeCleanup: true }, (_, path, cleanup) => {
  writeFileSync(`${path}/default.svg`, generateIcon(IconMapPin));

  writeFileSync(`${path}/a_building.svg`, generateIcon(IconLetterA, '#A12E2A'));
  writeFileSync(`${path}/b_building.svg`, generateIcon(IconLetterB, '#D88535'));
  writeFileSync(`${path}/c_building.svg`, generateIcon(IconLetterC, '#377641'));
  writeFileSync(`${path}/d_building.svg`, generateIcon(IconLetterD, '#1E3368'));
  writeFileSync(`${path}/e_building.svg`, generateIcon(IconLetterE, '#2B66B1'));
  writeFileSync(`${path}/f_building.svg`, generateIcon(IconLetterF, '#814A8C'));
  writeFileSync(`${path}/g_building.svg`, generateIcon(IconLetterG, '#201816'));

  writeFileSync(`${path}/dormitory.svg`, generateIcon(IconHome));
  writeFileSync(`${path}/park.svg`, generateIcon(IconTrees));
  writeFileSync(`${path}/tennis.svg`, generateIcon(IconBallTennis));
  writeFileSync(`${path}/training_gym.svg`, generateIcon(IconBarbellFilled));
  writeFileSync(`${path}/bus_stop.svg`, generateIcon(IconBusStop));
  writeFileSync(`${path}/pool.svg`, generateIcon(IconSwimming));
  writeFileSync(`${path}/kyudo.svg`, generateIcon(IconArcheryArrow));
  writeFileSync(`${path}/health_care.svg`, generateIcon(IconStethoscope));
  writeFileSync(`${path}/gym.svg`, generateIcon(IconBallBasketball));
  writeFileSync(`${path}/bicycle_parking.svg`, generateIcon(IconMotorbike));
  writeFileSync(`${path}/parking.svg`, generateIcon(IconParking));
  writeFileSync(`${path}/library.svg`, generateIcon(IconBook));
  writeFileSync(`${path}/canteen.svg`, generateIcon(IconToolsKitchen2));
  writeFileSync(`${path}/baseball.svg`, generateIcon(IconBallBaseball));
  writeFileSync(`${path}/athletic.svg`, generateIcon(IconRun));

  execSync(
    `spreet --minify-index-file ${path} ${join(import.meta.dirname, 'public/sprite')}`,
  );
  execSync(
    `spreet --retina --minify-index-file ${path} ${join(import.meta.dirname, 'public/sprite@2x')}`,
  );

  cleanup();
});
