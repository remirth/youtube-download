import type {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type {getStaticProps} from '../pages/audio/[videoId]';
import {DownloadButton} from '.';
import {useCallback} from 'react';

export const DownloadPage = ({
  imageURL,
  videoId,
  videoTitle,
  videoURL,
  videoDescription,
  format,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const truncate = useTruncate();
  return (
    <>
      <div className="h-full w-full">
        <div className="grid auto-cols-auto place-items-center p-4">
          <h1 className="text-center text-2xl font-bold">
            {truncate(videoTitle ?? 'Title', 45)}
          </h1>
          <div className="mt-4 grid grid-cols-2">
            <Link href={videoURL ?? '/'}>
              <Image
                priority
                src={imageURL ?? '/missing_logo.jpg'}
                width={168}
                height={94}
                alt="The logo of the clip"
              />
            </Link>
            <div>{truncate(videoDescription ?? 'Description', 70)}</div>
          </div>
          <div className="mt-2 grid grid-cols-1 pb-4">
            <DownloadButton {...{videoId, videoTitle, format}} />
          </div>
          <Link href={'/'}>
            <button className="btn-primary btn-sm btn">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const useTruncate = () => {
  return useCallback((text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  }, []);
};
