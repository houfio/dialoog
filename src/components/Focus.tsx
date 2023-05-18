import { ReactNode, useEffect, useRef, useState } from 'react';

import { useLayoutEffect } from '../hooks/useLayoutEffect';

type Props = {
  children?: ReactNode,
  enabled: boolean
};

export const tabbableQueries = [
  'input',
  'button',
  'select',
  'textarea',
  'a[href]',
  '*[tabindex]:not([data-focus])'
];

export function Focus({ children, enabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(true);
  const [last, setLast] = useState<HTMLElement>();

  useLayoutEffect(() => {
    if (enabled) {
      setLast(document.activeElement as HTMLElement || undefined);
      focusEdge(true);
    }
  }, [enabled]);

  useLayoutEffect(() => () => {
    mounted.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) {
      last?.focus();
    }

    return () => {
      if (!mounted.current) {
        last?.focus();
      }
    };
  }, [enabled, last]);

  const focusEdge = (first: boolean) => {
    const tabbable = Array.from(ref.current?.querySelectorAll<HTMLElement>(tabbableQueries.join(',')) || []).filter((e) => e.tabIndex >= 0);

    if (!tabbable.length) {
      return;
    }

    tabbable[first ? 0 : tabbable.length - 1].focus();
  };

  return (
    <div ref={ref}>
      {enabled && (
        <div tabIndex={0} onFocus={() => focusEdge(false)} data-focus=""/>
      )}
      {children}
      {enabled && (
        <div tabIndex={0} onFocus={() => focusEdge(true)} data-focus=""/>
      )}
    </div>
  );
}
