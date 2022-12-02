import {readdirSync} from 'fs';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import {join} from 'path';
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
  const paths: {params: {videoId: string}}[] = [];
  const publicPath = join(process.cwd(), 'public', 'audio');
  readdirSync(publicPath).forEach((file) => {
    const [videoId] = file.split('.');
    if (videoId) {
      paths.push({params: {videoId}});
    }
  });
  return {
    paths: paths,
    fallback: true,
  };
};
