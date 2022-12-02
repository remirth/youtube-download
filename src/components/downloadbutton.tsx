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
  const [fname, href] = useMemo(
    () => [
      `${videoTitle}${DownloadConfig[format]?.FileExtension}`,
      `/${format}/${videoId}${DownloadConfig[format]?.FileExtension}`,
    ],
    [videoTitle, format, videoId]
  );

  return (
    <a href={href} download={fname}>
      <button className="btn-primary btn-wide btn">Download</button>
    </a>
  );
};
