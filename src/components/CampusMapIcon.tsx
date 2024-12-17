import type { TablerIcon } from '@tabler/icons-react';
import { renderToString } from 'react-dom/server';
import { MapImage } from './MapImage';

export function CampusMapIcon({
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
