import {useRouter} from 'next/router';
import {forwardRef, useEffect, useMemo, useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import {DownloadConfig} from '../../constants';
import {useDownload, useMBFormat} from './hooks';

export type DownloadButtonProps = {
  videoId: string | undefined;
  videoTitle: string | undefined;
  contentLength: string | undefined;
  format: keyof typeof DownloadConfig;
};

export const DownloadButton = ({
  videoId,
  format,
  videoTitle,
  contentLength,
}: DownloadButtonProps): JSX.Element => {
  const fileName = useMemo(
    () => `${videoTitle}.${DownloadConfig[format]?.FileExtension}`,
    [videoTitle, format]
  );
  const downloadURL = useMemo(() => {
    const params = new URLSearchParams({
      format,
      videoTitle: encodeURI(videoTitle ?? 'Title'),
    });
    return `/api/${videoId}?${params}`;
  }, [videoId, format, videoTitle]);
  const loadingElement = useRef<HTMLDivElement>(null);
  const {download, blobURL, receivedLength, ...rest} = useDownload({
    downloadURL,
    loadingElement,
    contentLength,
  });

  const {isFallback} = useRouter();
  const formatMB = useMBFormat();

  useEffect(() => {
    if (blobURL || rest.isLoading || isFallback) {
      return;
    }

    download();
  }, [blobURL, isFallback, download, rest.isLoading]);

  const total = useMemo(
    () => formatMB(parseFloat(contentLength ?? '0')),
    [contentLength, formatMB]
  );

  const size = useMemo(() => {
    return formatMB(receivedLength);
  }, [receivedLength, formatMB]);

  const progress = useMemo(() => {
    return `${size}/${total}`;
  }, [size, total]);

  if (isFallback) {
    return (
      <div className="h-12 w-48 lg:w-64">
        <Skeleton height="100%" />
      </div>
    );
  }

  return (
    <>
      <label className="mx-auto text-sm">{progress}</label>
      <a href={blobURL} download={fileName}>
        <button className="btn-primary btn max-h-12 w-48 lg:w-64">
          <Loader ref={loadingElement} {...rest} {...{size}} />
        </button>
      </a>
    </>
  );
};

type LoaderProps = {
  size: string;
  percentLoaded: string;
  isLoading: boolean;
};
const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({isLoading, percentLoaded, size}, forwardedRef) => {
    if (isLoading) {
      return (
        <>
          <div
            className="radial-progress text-secondary"
            style={
              {
                '--size': '2.5rem',
                '--thickness': '0.25rem',
              } as never
            }
            ref={forwardedRef}
          >
            <div className="m-1">{percentLoaded}</div>
          </div>
        </>
      );
    }

    return <div>Download {size}</div>;
  }
);

Loader.displayName = 'Loader';
