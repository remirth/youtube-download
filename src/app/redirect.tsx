'use client';

import {useRouter} from 'next/navigation';
import type {ChildrenProps} from 'props';
import {useEffect} from 'react';

type RedirectProps = {
  to: string;
} & ChildrenProps;
export const RedirectProvider = ({children, to}: RedirectProps) => {
  const {push} = useRouter();

  useEffect(() => {
    push(to);
  }, [push, to]);

  return <>{children}</>;
};
