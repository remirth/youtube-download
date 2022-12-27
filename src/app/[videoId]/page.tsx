import type {PageProps} from 'next/augment';
import type {FormatProps, VideoIdProps} from 'props';
import {DownloadComponent} from './download_component';

const Page = ({params, searchParams}: PageProps<VideoIdProps, FormatProps>) => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <DownloadComponent
        format={searchParams.format ?? 'audio'}
        videoId={params.videoId ?? ''}
      />
    </>
  );
};

export default Page;
