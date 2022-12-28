import type {FormatProps, VideoDetailsProps, VideoIdProps} from 'props';
import {DownloadConfig} from '../../../constants';
import {DATA_URI_PREFIX, getStreamAsDataURI} from '../../../lib/ytdl';

export const DownloadButton = async ({
  videoId,
  format,
  details,
}: VideoIdProps & FormatProps & VideoDetailsProps) => {
  const parsedFormat = format === 'video' ? 'video' : 'audio';

  const {FileExtension} = DownloadConfig[parsedFormat];
  const fileName = `${details.title ?? videoId}.${FileExtension}`;

  const dataURI = await getStreamAsDataURI({
    videoId,
    format: parsedFormat,
  });

  const fileSizeInBytes = Math.ceil(
    ((dataURI.length - DATA_URI_PREFIX.length) * 3) / 4
  );

  const fileSizeMB = (fileSizeInBytes / 1000000).toFixed(2);

  return (
    <>
      <a download={fileName} href={dataURI}>
        <button className="btn-primary btn h-12 w-48 lg:w-64">
          {`Download ${parsedFormat} (${fileSizeMB} mb)`}
        </button>
      </a>
    </>
  );
};
