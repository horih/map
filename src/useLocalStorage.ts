import { useState } from 'react';

export function useLocalStorage(key: string, init: string) {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? init);
  return [
    value,
    (action: (prev: string) => string) => {
      setValue((prev) => {
        const value = action(prev);
        localStorage.setItem(key, value);
        return value;
      });
    },
  ] as const;
}
