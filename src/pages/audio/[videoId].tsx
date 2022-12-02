import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import ytdl from 'ytdl-core';
import {DownloadPage} from '../../components/download';
import type {DownloadConfig} from '../../constants';

const Page = (Props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <DownloadPage {...Props}></DownloadPage>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<{
  videoId: string | undefined;
  videoDescription: string | undefined;
  videoTitle: string | undefined;
  videoURL: string | undefined;
  imageURL: string | undefined;
  format: keyof typeof DownloadConfig;
}> = async (context) => {
  const videoId = context.params?.['videoId'] as string;
  if (!ytdl.validateID(videoId)) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

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
      format: 'audio',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
