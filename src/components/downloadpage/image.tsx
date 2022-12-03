import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import {useMemo} from 'react';
import {useRouter} from 'next/router';

export type DownloadImageProps = {
  imageURL: string | undefined;
  videoURL: string | undefined;
  height: number;
  width: number;
};
export const DownloadImage = ({
  imageURL,
  videoURL,
  height,
  width,
}: DownloadImageProps) => {
  const {isFallback} = useRouter();
  const href = useMemo(() => videoURL ?? '/', [videoURL]);
  const src = useMemo(() => imageURL ?? '/missing_logo.jpg', [imageURL]);
  if (isFallback) {
    return <Skeleton height="100%" />;
  }

  return (
    <Link {...{href}}>
      <Image priority {...{src, height, width}} alt="The logo of the clip" />
    </Link>
  );
};
