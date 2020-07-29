import { useEffect, useLayoutEffect as useEffect2 } from 'react';

export const useLayoutEffect = typeof document !== 'undefined' ? useEffect2 : useEffect;
