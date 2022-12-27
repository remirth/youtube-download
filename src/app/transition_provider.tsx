'use client';
import type {ChildrenProps} from 'props';
import {useMemo, useCallback, useEffect, useRef} from 'react';
import type {RefObject} from 'react';

export const TransitionProvider = ({children}: ChildrenProps) => {
  const element = useRef<HTMLDivElement>(null);
  useTransition(element);

  return (
    <div ref={element} className="opacity-0 transition-opacity ease-in-out">
      {children}
    </div>
  );
};

const useTransition = (
  element: RefObject<HTMLElement>,
  delay = 50,
  steps = 50
): void => {
  const delayPart = useMemo(() => delay / steps, [delay, steps]);
  const increment = useMemo(() => 100 / steps, [steps]);

  const incrementOpacity = useCallback(
    (current: number, timeout: number) => {
      if (current > 100) return;
      if (element.current) {
        element.current.style.opacity = `${current / 100}`;
      }
      setTimeout(() => incrementOpacity(current + increment, timeout), timeout);
    },
    [increment, element]
  );

  useEffect(() => {
    incrementOpacity(0, delayPart);
  }, [incrementOpacity, delayPart]);
};
