import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import {getPlaiceholder} from 'plaiceholder';
import type {IGetPlaiceholderReturn} from 'plaiceholder/dist/plaiceholder';
import ytdl from 'ytdl-core';
import {DownloadPage} from '../components/downloadpage/download';
import type {DownloadConfig} from '../constants';

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
  imageProps: IGetPlaiceholderReturn | undefined;
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

  const imageURL = details.thumbnails[0]?.url ?? '/public/missing_logo.jpg';
  const imageProps = await getPlaiceholder(imageURL);

  return {
    props: {
      videoId,
      videoDescription: details.description ?? '',
      videoURL: details.video_url,
      videoTitle: details.title,
      format: 'audio',
      imageProps,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
