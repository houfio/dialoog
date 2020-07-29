import { createDakpan } from 'dakpan';
import { ReactNode } from 'react';

type ElementFn = (open: boolean, remove: () => void) => ReactNode;

type Options = {
  strict?: boolean,
  onDismiss?: () => void
};

type State = {
  dialogs: ({
    key: string,
    open: boolean,
    element: ElementFn
  } & Options)[]
};

let key = 0;

export const [DialoogProvider, useDialoog] = createDakpan<State>({
  dialogs: []
})({
  push: (element: ElementFn, options?: Options) => (state) => ({
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

