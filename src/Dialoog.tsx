import * as React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Focus } from './Focus';
import { useContainer } from './hooks/useContainer';
import { useHide } from './hooks/useHide';
import { useKey } from './hooks/useKey';
import { useScrollLock } from './hooks/useScrollLock';
import { useDialoog } from './state';

export function Dialoog() {
  const [{ dialogs }, { close, remove }] = useDialoog();
  const [hide, unhide] = useHide();
  const [lock, unlock] = useScrollLock();
  const containerRef = useContainer('dialoog');

  useKey('Escape', () => dialogs.length && !dialogs[dialogs.length - 1].strict && close(), [dialogs, close]);

  useEffect(() => {
    if (!dialogs.length) {
      return;
    }

    hide(containerRef);
    lock();

    return () => {
      unhide();
      unlock();
    };
  }, [dialogs, hide, unhide, lock, unlock]);

  return !dialogs.length || !containerRef.current ? null : createPortal((
    <>
      {dialogs.map((dialog, index) => (
        <Focus key={dialog.key} enabled={index === dialogs.length - 1}>
          {dialog.element({
            open: dialog.open,
            close: close.c(dialog.stack, dialog.key),
            remove: remove.c(dialog.key),
            index
          })}
        </Focus>
      ))}
    </>
  ), containerRef.current);
}
