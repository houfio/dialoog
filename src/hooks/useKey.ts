import { DependencyList, useCallback, useEffect } from 'react';

export function useKey(key: string, fn: () => void, deps: DependencyList) {
  const callback = useCallback(fn, deps);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== key) {
        return;
      }

      callback();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}
