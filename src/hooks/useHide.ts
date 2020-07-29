import { RefObject, useCallback, useRef } from 'react';

export function useHide(): [(...exclusions: RefObject<unknown>[]) => void, () => void] {
  const ref = useRef(new Set<HTMLElement>());
  const hide = useCallback((...exclusions: RefObject<unknown>[]) => {
    if (ref.current.size) {
      return;
    }

    const ignore = ['SCRIPT', 'STYLE', 'TEMPLATE'];

    for (const child of Array.from(document.body.children) as HTMLElement[]) {
      if (ignore.indexOf(child.tagName) !== -1 || exclusions.some(({ current }) => current === child)) {
        continue;
      }

      child.setAttribute('aria-hidden', 'true');
      ref.current.add(child);
    }
  }, []);
  const unhide = useCallback(() => {
    ref.current.forEach((child) => child.removeAttribute('aria-hidden'));
    ref.current.clear();
  }, []);

  return [hide, unhide];
}
