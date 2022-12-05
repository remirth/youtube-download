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
  contentLength: string | undefined;
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

  const {videoDetails, formats} = await ytdl
    .getBasicInfo(videoId)
    .then(({videoDetails, formats}) => {
      return {videoDetails, formats};
    });

  const imageURL =
    videoDetails.thumbnails[0]?.url ?? '/public/missing_logo.jpg';
  const imageProps = await getPlaiceholder(imageURL);
  const format =
    formats.find(
      ({mimeType, audioQuality, contentLength}) =>
        mimeType?.includes('audio') &&
        audioQuality === 'AUDIO_QUALITY_MEDIUM' &&
        contentLength
    ) ??
    formats.find(
      ({mimeType, contentLength}) =>
        mimeType?.includes('audio') && contentLength
    );

  return {
    props: {
      videoId,
      contentLength: format?.contentLength,
      videoDescription: videoDetails.description ?? '',
      videoURL: videoDetails.video_url,
      videoTitle: videoDetails.title,
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
