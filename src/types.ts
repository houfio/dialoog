import { ReactNode } from 'react';

export type DialoogProps = {
  open: boolean,
  close: () => void,
  remove: () => void,
  index: number
};

export type Options = {
  stack?: string,
  capture?: boolean,
  strict?: boolean,
  onClose?: () => void
};

export type State = {
  dialogs: ({
    key: string,
    open: boolean,
    element: (props: DialoogProps) => ReactNode
  } & Options)[]
};
