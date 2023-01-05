import type {FormatProps, VideoIdProps} from 'props';
import {Suspense} from 'react';
import {getVideoDetails} from '../../lib/videoInfo';
import {Skeleton} from '../skeleton';
import {DownloadBack} from './back';
import {DownloadButton} from './button';
import {DownloadDescription} from './description';
import {DownloadImage} from './image';
import {DownloadTitle} from './title';

export const DownloadComponent = async (props: VideoIdProps & FormatProps) => {
  const details = await getVideoDetails(props.videoId ?? '').catch(
    () => undefined
  );

  if (!details) {
    return (
      <>
        <h1>Video not found</h1>
        <DownloadBack />
      </>
    );
  }

  return (
    <>
      <div className="h-full w-full">
        <div className="grid auto-cols-auto place-items-center p-4">
          <DownloadTitle details={details} />
          <div className="mt-4 grid h-[94px] w-full grid-cols-2 gap-4 overflow-hidden border-primary">
            <div className="h-full w-full place-self-end">
              {/* @ts-expect-error Server Component */}
              <DownloadImage details={details} {...props} />
            </div>
            <DownloadDescription details={details} />
          </div>
          <div className="mt-8 grid grid-cols-1 pb-4">
            <Suspense
              fallback={
                <Skeleton
                  width="12rem"
                  height="3rem"
                  largeWidth="16rem"
                  background="primary"
                />
              }
            >
              {/* @ts-expect-error Server Component */}
              <DownloadButton {...props} details={details} />
            </Suspense>
          </div>
          <DownloadBack />
        </div>
      </div>
    </>
  );
};
