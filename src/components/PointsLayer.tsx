import { useAtomValue } from 'jotai';
import { Layer, Source } from 'react-map-gl/maplibre';
import { languageAtom } from '../atoms';

export function PointsLayer() {
  const language = useAtomValue(languageAtom);

  return (
    <Source type="geojson" data="/points.geojson">
      <Layer
        type="symbol"
        layout={{
          'icon-image': ['coalesce', ['get', 'icon'], 'default'],
          'text-field': [
            'format',
            ['coalesce', ['get', `label:${language}`], ['get', 'label:ja']],
            { 'font-scale': 0.8 },
          ],
          'text-font': ['Noto Sans CJK JP Regular'],
          'text-offset': [0, 1],
          'text-anchor': 'top',
        }}
      />
    </Source>
  );
}
