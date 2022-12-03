import {useRouter} from 'next/router';
import Skeleton from 'react-loading-skeleton';
import {useTruncate} from './hooks';

type DownloadDescriptionProps = {
  videoDescription: string | undefined;
};
export const DownloadDescription = ({
  videoDescription,
}: DownloadDescriptionProps) => {
  const [{isFallback}, truncate] = [useRouter(), useTruncate(60)];
  if (isFallback) {
    return (
      <>
        <div>
          <Skeleton height="20%" width="90%" />
          <Skeleton count={2} height="20%" width="60%" />
        </div>
      </>
    );
  }

  return <div>{truncate(videoDescription ?? 'Description')}</div>;
};
