import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import {useMemo} from 'react';
import {useRouter} from 'next/router';
import type {IGetPlaiceholderReturn} from 'plaiceholder/dist/plaiceholder';

export type DownloadImageProps = {
  videoURL: string | undefined;
  imageProps: IGetPlaiceholderReturn | undefined;
};
export const DownloadImage = ({videoURL, imageProps}: DownloadImageProps) => {
  const {isFallback} = useRouter();
  const href = useMemo(() => videoURL ?? '/', [videoURL]);
  if (isFallback || !imageProps) {
    return <Skeleton height="100%" width="100%" />;
  }

  return (
    <Link {...{href}}>
      <Image
        priority
        placeholder="blur"
        blurDataURL={imageProps.base64}
        {...imageProps.img}
        alt="The logo of the clip"
      />
    </Link>
  );
};
