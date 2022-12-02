/* eslint-disable operator-linebreak */
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {useCallback} from 'react';
import ytdl from 'ytdl-core';
import {DownloadButton} from '../components';

const Page = ({
  imageURL,
  videoId,
  videoTitle,
  videoURL,
  videoDescription,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const truncate = useTruncate(70);
  return (
    <>
      <div className="grid auto-cols-auto place-items-center p-4">
        <h1 className="text-center text-2xl font-bold">{videoTitle}</h1>
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
          <div>{truncate(videoDescription ?? 'Description')}</div>
        </div>
        <div className="mt-2 grid grid-cols-1 pb-4">
          <DownloadButton {...{videoId, videoTitle, format: 'audio'}} />
          <div className="mt-2">
            <DownloadButton {...{videoId, videoTitle, format: 'video'}} />
          </div>
        </div>
      </div>
    </>
  );
};

const useTruncate = (length: number) => {
  return useCallback(
    (text: string) => {
      return text.length > length ? `${text.slice(0, length)}...` : text;
    },
    [length]
  );
};

export default Page;

export const getStaticProps: GetStaticProps<{
  videoId: string | undefined;
  videoDescription: string | undefined;
  videoTitle: string | undefined;
  videoURL: string | undefined;
  imageURL: string | undefined;
}> = async (context) => {
  const videoId = context.params?.['videoid'] as string;

  const details = await ytdl
    .getInfo(videoId)
    .then(({videoDetails}) => videoDetails);

  return {
    props: {
      videoId,
      imageURL: details.thumbnails[0]?.url,
      videoDescription: details.description ?? '',
      videoURL: details.video_url,
      videoTitle: details.title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
