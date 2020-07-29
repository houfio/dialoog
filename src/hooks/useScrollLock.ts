import { useCallback, useRef } from 'react';

export function useScrollLock(): [() => void, () => void] {
  const ref = useRef(new Map<HTMLElement, number>());
  const lock = useCallback(() => {
    if (ref.current.size) {
      return;
    }

    const fixed = [document.body, ...Array.from(document.querySelectorAll<HTMLElement>('[data-fixed]'))];
    const scrollbar = innerWidth - document.documentElement.clientWidth;

    document.body.style.overflowY = 'hidden';

    for (const element of fixed) {
      const width = parseInt(getComputedStyle(element).paddingRight, 10);

      ref.current.set(element, width);

      element.style.paddingRight = `${width + scrollbar}px`;
    }
  }, []);
  const unlock = useCallback(() => {
    document.body.style.overflowY = '';

    ref.current.forEach((width, element) => element.style.paddingRight = '');
    ref.current.clear();
  }, []);

  return [lock, unlock];
}
