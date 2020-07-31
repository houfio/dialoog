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

  const capturing = dialogs.filter((dialog) => dialog.capture);

  useKey('Escape', () => {
    if (!capturing.length) {
      return;
    }

    const top = capturing[capturing.length - 1];

    if (top.strict) {
      return;
    }

    void close(top.stack, top.key);
  }, [capturing, close]);

  useEffect(() => {
    if (!capturing.length) {
      return;
    }

    hide(containerRef);
    lock();

    return () => {
      unhide();
      unlock();
    };
  }, [capturing, hide, unhide, lock, unlock]);

  return !dialogs.length || !containerRef.current ? null : createPortal((
    <>
      {dialogs.map((dialog) => (
        <Focus
          key={dialog.key}
          enabled={Boolean(capturing.length) && capturing.indexOf(dialog) === capturing.length - 1}
        >
          {dialog.element({
            open: dialog.open,
            close: close.c(dialog.stack, dialog.key),
            remove: remove.c(dialog.key),
            index: dialogs.filter((d) => d.stack === dialog.stack).indexOf(dialog)
          })}
        </Focus>
      ))}
    </>
  ), containerRef.current);
}
