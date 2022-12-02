import {useMemo} from 'react';
import {DownloadConfig} from '../constants';

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

  return (
    <a href={href}>
      <button className="btn-primary btn-wide btn">
        Download {DownloadConfig[format].Title}
      </button>
    </a>
  );
};
