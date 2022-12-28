import Link from 'next/link';
import Image from 'next/image';
import type {VideoDetailsProps, VideoIdProps} from 'props';
import {getPlaiceholder} from 'plaiceholder';

export const DownloadImage = async ({
  details,
  videoId,
}: VideoDetailsProps & VideoIdProps) => {
  const imageURL = details?.thumbnails[0]?.url ?? '/public/missing_logo.jpg';
  const imageProps = await getPlaiceholder(imageURL);

  return (
    <>
      <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
        <Image
          priority
          placeholder="blur"
          blurDataURL={imageProps.base64}
          {...imageProps.img}
          alt="The logo of the clip"
        />
      </Link>
    </>
  );
};
