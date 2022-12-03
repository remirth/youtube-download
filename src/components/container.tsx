import type {RefObject} from 'react';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {SkeletonTheme} from 'react-loading-skeleton';

export const Container = ({children}: {children: React.ReactNode}) => {
  const element = useRef<HTMLDivElement>(null);
  useTransition(element);
  return (
    <div className="container mx-auto h-screen overflow-hidden px-4">
      <div className="mx-auto grid h-full max-w-3xl auto-cols-auto place-items-center">
        <div className="h-1/2 w-full">
          <div className="mx-auto h-fit min-h-[50%] w-full rounded-xl bg-base-200 shadow-2xl sm:w-1/2">
            <div
              ref={element}
              className="opacity-0 transition-opacity ease-in-out"
            >
              <SkeletonTheme baseColor="#212121">
                <main>{children}</main>
              </SkeletonTheme>
            </div>
          </div>
        </div>
      </div>
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
