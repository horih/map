import type { IControl } from 'maplibre-gl';

export class ButtonControl implements IControl {
  #container: HTMLDivElement | undefined;
  #button: HTMLButtonElement;

  constructor(button: HTMLButtonElement) {
    this.#button = button;
  }

  onAdd() {
    this.#container = document.createElement('div');
    this.#container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    this.#container.appendChild(this.#button);
    return this.#container;
  }

  onRemove() {
    this.#container?.parentNode?.removeChild(this.#container);
  }
}
