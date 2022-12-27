'use client';
import type {ChildrenProps} from 'props';
import {SkeletonTheme} from 'react-loading-skeleton';
import NextNProgress from 'nextjs-progressbar';

export const ThemeProvider = ({children}: ChildrenProps) => {
  return (
    <>
      <NextNProgress color="#F28C18" />
      <SkeletonTheme baseColor="#212121">{children}</SkeletonTheme>
    </>
  );
};
