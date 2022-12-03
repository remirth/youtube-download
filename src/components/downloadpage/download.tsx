import {DownloadImage} from './image';
import {} from './image';
import type {InferGetStaticPropsType} from 'next';
import type {getStaticProps} from '../../pages/[videoId]';
import {
  DownloadBack,
  DownloadButton,
  DownloadDescription,
  DownloadTitle,
} from '..';

export const DownloadPage = ({
  videoId,
  videoTitle,
  videoURL,
  videoDescription,
  format,
  imageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="h-full w-full">
        <div className="grid auto-cols-auto place-items-center p-4">
          <DownloadTitle {...{videoTitle}} />
          <div className="mt-4 grid h-[94px] w-full grid-cols-2 gap-4 overflow-hidden border-primary">
            <div className="h-full w-full place-self-end">
              <DownloadImage {...{videoURL, imageProps}} />
            </div>
            <DownloadDescription {...{videoDescription}} />
          </div>
          <div className="mt-4 grid grid-cols-1 pb-4">
            <DownloadButton {...{videoId, videoTitle, format}} />
          </div>
          <DownloadBack />
        </div>
      </div>
    </>
  );
};
