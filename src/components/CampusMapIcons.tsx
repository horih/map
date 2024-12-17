import { renderToString } from 'react-dom/server';
import { MapImage } from './MapImage';

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

function CampusMapIcon({
  id,
  color = '#8A8A8A',
  icon: Icon,
}: {
  id: string;
  color?: string;
  icon: TablerIcon;
}) {
  const img = new Image(32, 32);
  img.src = `data:image/svg+xml,${encodeURIComponent(
    renderToString(
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <title>{id}</title>
        <rect x="0" y="0" width="32" height="32" rx="8" ry="8" fill={color} />
        <Icon x="4" y="4" color="#FFFFFF" />
      </svg>,
    ),
  )}`;
  return <MapImage id={id} image={img} />;
}

export function CampusMapIcons() {
  return (
    <>
      <CampusMapIcon id="default" icon={IconMapPin} />

      <CampusMapIcon id="a_building" color="#A12E2A" icon={IconLetterA} />
      <CampusMapIcon id="b_building" color="#D88535" icon={IconLetterB} />
      <CampusMapIcon id="c_building" color="#377641" icon={IconLetterC} />
      <CampusMapIcon id="d_building" color="#1E3368" icon={IconLetterD} />
      <CampusMapIcon id="e_building" color="#2B66B1" icon={IconLetterE} />
      <CampusMapIcon id="f_building" color="#814A8C" icon={IconLetterF} />
      <CampusMapIcon id="g_building" color="#201816" icon={IconLetterG} />

      <CampusMapIcon id="dormitory" icon={IconHome} />
      <CampusMapIcon id="park" icon={IconTrees} />
      <CampusMapIcon id="tennis" icon={IconBallTennis} />
      <CampusMapIcon id="training_gym" icon={IconBarbellFilled} />
      <CampusMapIcon id="bus_stop" icon={IconBusStop} />
      <CampusMapIcon id="pool" icon={IconSwimming} />
      <CampusMapIcon id="kyudo" icon={IconArcheryArrow} />
      <CampusMapIcon id="health_care" icon={IconStethoscope} />
      <CampusMapIcon id="gym" icon={IconBallBasketball} />
      <CampusMapIcon id="bicycle_parking" icon={IconMotorbike} />
      <CampusMapIcon id="parking" icon={IconParking} />
      <CampusMapIcon id="library" icon={IconBook} />
      <CampusMapIcon id="canteen" icon={IconToolsKitchen2} />
      <CampusMapIcon id="baseball" icon={IconBallBaseball} />
      <CampusMapIcon id="athletic" icon={IconRun} />
    </>
  );
}
