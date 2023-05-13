import { useInsertionEffect, useRef } from 'react';

export function useContainer() {
  const ref = useRef<HTMLElement>();

  useInsertionEffect(() => {
    ref.current = document.getElementById('dialoog') ?? undefined;

    if (!ref.current) {
      ref.current = document.createElement('div');
      ref.current.id = 'dialoog';

      document.body.appendChild(ref.current);
    }

    return () => {
      document.body.removeChild(ref.current!);
    };
  }, []);

  return ref;
}
