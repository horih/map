import { MapImage } from './MapImage';

export function CampusMapIcon({ id }: { id: string }) {
  const img = new Image(32, 32);
  img.src = `/generated/${id}.webp`;
  return <MapImage id={id} image={img} />;
}
