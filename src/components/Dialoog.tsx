import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useContainer } from '../hooks/useContainer';
import { useHide } from '../hooks/useHide';
import { useKey } from '../hooks/useKey';
import { useScrollLock } from '../hooks/useScrollLock';
import { DialoogProps } from '../types';

import { Focus } from './Focus';

type Props = {
  open: boolean,
  capture?: boolean,
  strict?: boolean,
  setOpen: (open: boolean) => void,
  children: (props: DialoogProps) => ReactNode
};

export function Dialoog({ children, open, capture = true, strict = false, setOpen }: Props) {
  const [mounted, setMounted] = useState(open);
  const [hide, unhide] = useHide();
  const [lock, unlock] = useScrollLock();
  const containerRef = useContainer();

  useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open, setMounted]);

  useKey('Escape', () => {
    if (capture && !strict) {
      setOpen(false);
    }
  }, [capture, strict, setOpen]);

  useEffect(() => {
    if (!capture) {
      return;
    }

    hide(containerRef);
    lock();

    return () => {
      unhide();
      unlock();
    };
  }, [capture, hide, unhide, lock, unlock]);

  return !mounted || !containerRef.current ? null : createPortal((
    <Focus enabled={capture}>
      {children({
        open,
        close: () => setOpen(false),
        remove: () => setMounted(false)
      })}
    </Focus>
  ), containerRef.current);
}
