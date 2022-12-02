import ffmpeg from 'fluent-ffmpeg';
import type {NextApiRequest, NextApiResponse} from 'next';
import ytdl from 'ytdl-core';
import {DownloadConfig} from '../../constants';
import ffmpegPath from 'ffmpeg-static';

export const handler = (
  {method, query}: NextApiRequest,
  res: NextApiResponse
) => {
  if (!['GET'].includes(method ?? '')) {
    res.statusMessage = 'Method not allowed';
    res.status(405).end();
    return;
  }

  const {videoId, format, videoTitle} = query;
  const formatId: keyof typeof DownloadConfig =
    format === 'video' ? 'video' : 'audio';

  const id = Array.isArray(videoId) ? videoId[0] : videoId;

  if (!id || !ytdl.validateID(id)) {
    res.statusMessage = 'Video ID is required';
    res.status(400).end();
    return;
  }

  const {FileExtension, ...config} = DownloadConfig[formatId];

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${videoTitle ?? id}.${FileExtension}"`
  );

  ffmpeg.setFfmpegPath(ffmpegPath as string);

  ffmpeg(ytdl(id, {...config}))
    .format(FileExtension)
    .pipe(res);
};

export default handler;
