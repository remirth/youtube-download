import Link from 'next/link';
import {useRouter} from 'next/router';
import Skeleton from 'react-loading-skeleton';

export const DownloadBack = (): JSX.Element => {
  const {isFallback} = useRouter();

  if (isFallback) {
    return (
      <div className="h-8 w-16">
        <Skeleton height="100%" />
      </div>
    );
  }
  return (
    <Link href={'/'}>
      <button className="btn-secondary btn-sm btn w-16">Back</button>
    </Link>
  );
};
