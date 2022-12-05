import type {Dispatch, RefObject, SetStateAction} from 'react';
import {useCallback, useMemo, useState} from 'react';

export const useTruncate = (length: number) => {
  return useCallback(
    (text: string) => {
      return text.length > length ? `${text.slice(0, length)}...` : text;
    },
    [length]
  );
};

type useDownloadProps = {
  loadingElement: RefObject<HTMLDivElement>;
  contentLength: string | undefined;
  downloadURL: string;
};
type useDownloadResult = {
  download: () => Promise<void>;
  blobURL: string;
  isLoading: boolean;
  receivedLength: number;
  percentLoaded: string;
};

export const useDownload = ({
  loadingElement,
  contentLength,
  downloadURL,
}: useDownloadProps): useDownloadResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [percentLoaded, setPercentLoaded] = useState('0%');
  const [receivedLength, setReceivedLength] = useState(0);
  const [blobURL, setBlobURL] = useState('');

  const total = useMemo(
    () => parseFloat(contentLength ?? '0'),
    [contentLength]
  );
  const setProgress = useProgress(loadingElement, setPercentLoaded);

  const download = useCallback(async () => {
    console.count('download');
    setReceivedLength(0);
    setProgress(0, total);
    setIsLoading(true);

    const response = await fetch(downloadURL);
    if (!response.body) {
      return;
    }
    const reader = response.body.getReader();

    const chunks = [];
    let currentLength = 0;
    while (true) {
      const {done, value} = await reader.read();
      if (done) {
        break;
      }

      chunks.push(value);
      currentLength += value.length;
      setReceivedLength(currentLength);
      setProgress(currentLength, total);
    }

    setBlobURL(URL.createObjectURL(new Blob(chunks)));
    setIsLoading(false);
  }, [setProgress, downloadURL, total]);

  return {
    download,
    blobURL,
    isLoading,
    receivedLength,
    percentLoaded,
  };
};

export const useProgress = (
  loadingObject: RefObject<HTMLDivElement>,
  setPercentLoaded: Dispatch<SetStateAction<string>>
) => {
  return useCallback(
    (receivedLength: number, total: number) => {
      if (loadingObject.current) {
        const progress = (receivedLength / total) * 100;
        loadingObject.current.style.setProperty('--value', String(progress));
        setPercentLoaded(`${progress.toFixed(0)}%`);
      }
    },
    [loadingObject, setPercentLoaded]
  );
};

export const useMBFormat = () => {
  return useCallback((bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' mb';
  }, []);
};
