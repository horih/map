import { useEffect, useState } from 'react';
import { MapImage } from './MapImage';

export function CampusMapIcon({ id }: { id: string }) {
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    const img = new Image(32, 32);
    img.src = `/generated/${id}.webp`;
    img.decode().then(() => setImage(img));
  }, [id]);

  return image ? <MapImage id={id} image={image} /> : null;
}
