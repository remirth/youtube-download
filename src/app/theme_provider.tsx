'use client';
import type {ChildrenProps} from 'props';
import {SkeletonTheme} from 'react-loading-skeleton';

export const ThemeProvider = ({children}: ChildrenProps) => {
  return (
    <>
      <SkeletonTheme baseColor="#212121">{children}</SkeletonTheme>
    </>
  );
};
