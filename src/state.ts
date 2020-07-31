import { createDakpan } from 'dakpan';
import { ReactNode } from 'react';

import { DialoogProps, Options, State } from './types';

let key = 0;

export const [DialoogProvider, useDialoog] = createDakpan<State>({
  dialogs: []
})({
  push: (element: (props: DialoogProps) => ReactNode, options?: Options) => (state) => ({
    ...state,
    dialogs: [
      ...state.dialogs,
      {
        key: String(++key),
        open: true,
        element,
        ...options
      }
    ]
  }),
  pop: () => (state) => ({
    ...state,
    dialogs: state.dialogs.map((dialog, i) => {
      if (i !== state.dialogs.length - 1) {
        return dialog;
      }

      dialog.onDismiss?.();

      return {
        ...dialog,
        open: false
      };
    })
  }),
  remove: (key: string) => (state) => ({
    ...state,
    dialogs: state.dialogs.filter((dialog) => dialog.key !== key)
  }),
  reset: () => (state) => ({
    ...state,
    dialogs: []
  })
});

