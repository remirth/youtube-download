import {useRouter} from 'next/router';
import Skeleton from 'react-loading-skeleton';
import {useTruncate} from './hooks';

type DownloadTitleProps = {
  videoTitle: string | undefined;
};
export const DownloadTitle = ({videoTitle}: DownloadTitleProps) => {
  const [{isFallback}, truncate] = [useRouter(), useTruncate(45)];
  if (isFallback) {
    return (
      <div className="h-8 w-full">
        <Skeleton height="100%" />
      </div>
    );
  }

  return (
    <h1 className="text-center text-2xl font-bold">
      {truncate(videoTitle ?? 'Title')}
    </h1>
  );
};
