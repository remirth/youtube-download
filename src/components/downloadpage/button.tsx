import {useRouter} from 'next/router';
import {useMemo} from 'react';
import Skeleton from 'react-loading-skeleton';
import {DownloadConfig} from '../../constants';

export type DownloadButtonProps = {
  videoId: string | undefined;
  videoTitle: string | undefined;
  format: keyof typeof DownloadConfig;
};

export const DownloadButton = ({
  videoId,
  format,
  videoTitle,
}: DownloadButtonProps): JSX.Element => {
  const href = useMemo(() => {
    const params = new URLSearchParams({
      format,
      videoTitle: encodeURI(videoTitle ?? 'Title'),
    });
    return `/api/${videoId}?${params}`;
  }, [videoId, format, videoTitle]);

  const {isFallback} = useRouter();
  if (isFallback) {
    return (
      <div className="h-12 w-48 lg:w-64">
        <Skeleton height="100%" />
      </div>
    );
  }

  return (
    <a {...{href}}>
      <button className="btn-primary btn w-48 lg:w-64">
        Download {DownloadConfig[format]?.Title}
      </button>
    </a>
  );
};
