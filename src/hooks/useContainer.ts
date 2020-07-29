import { useRef } from 'react';

export function useContainer(id: string) {
  const browser = typeof document !== 'undefined';
  const ref = useRef(browser ? document.getElementById(id) : null);

  if (!ref.current && browser) {
    ref.current = document.createElement('div');
    ref.current.id = id;

    document.body.appendChild(ref.current);
  }

  return ref;
}
