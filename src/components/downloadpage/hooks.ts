import {useCallback} from 'react';

export const useTruncate = (length: number) => {
  return useCallback(
    (text: string) => {
      return text.length > length ? `${text.slice(0, length)}...` : text;
    },
    [length]
  );
};
