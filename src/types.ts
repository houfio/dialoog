import { ReactNode } from 'react';

export type DialoogProps = {
  open: boolean,
  pop: () => void,
  remove: () => void,
  index: number
};

export type Options = {
  stack?: string,
  strict?: boolean,
  onDismiss?: () => void
};

export type State = {
  dialogs: ({
    key: string,
    open: boolean,
    element: (props: DialoogProps) => ReactNode
  } & Options)[]
};
