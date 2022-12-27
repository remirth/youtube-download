import {PassThrough} from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import {DownloadConfig} from '../constants';
import ytdl from 'ytdl-core';
import concat from 'concat-stream';
import {Base64Encode} from 'base64-stream';

type GetStreamProps = {
  videoId: string;
  format: 'video' | 'audio';
};
export const getStream = ({videoId, format}: GetStreamProps) => {
  if (!ytdl.validateID(videoId)) {
    throw new Error('Video ID is required');
  }

  const {FileExtension, ...config} = DownloadConfig[format];

  ffmpeg.setFfmpegPath(ffmpegPath as string);

  const file = new PassThrough();

  ffmpeg(ytdl(videoId, {...config}))
    .format(FileExtension)
    .pipe(file);

  return file;
};

export const getStreamAsBase64 = (props: GetStreamProps) => {
  return new Promise<string>((resolve, reject) => {
    const base64Stream = new Base64Encode();

    const concatCallback = (data: unknown) => resolve(data as string);

    getStream(props)
      .pipe(base64Stream)
      .pipe(concat(concatCallback))
      .on('error', reject);
  });
};
