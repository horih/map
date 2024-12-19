import type { ControlPosition } from 'maplibre-gl';
import { type PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useControl } from 'react-map-gl/maplibre';

export function ButtonControlGroup({
  position,
  children,
}: PropsWithChildren<{
  position?: ControlPosition;
}>) {
  const container = useRef(document.createElement('div'));
  container.current.className = 'maplibregl-ctrl maplibregl-ctrl-group';
  useControl(
    () => ({
      onAdd: () => {
        return container.current;
      },
      onRemove: () => {
        container.current.parentNode?.removeChild(container.current);
      },
    }),
    { position },
  );
  return createPortal(children, container.current);
}
