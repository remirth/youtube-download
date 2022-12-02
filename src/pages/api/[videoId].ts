import type {NextApiRequest, NextApiResponse} from 'next';
import ytdl from 'ytdl-core';
import {DownloadConfig} from '../../constants';

const handler = ({method, query}: NextApiRequest, res: NextApiResponse) => {
  if (method !== 'GET') {
    res.statusMessage = 'Method not allowed';
    res.status(405).end();
    return;
  }

  const {videoId, format} = query;
  const formatId: keyof typeof DownloadConfig =
    format === 'video' ? 'video' : 'audio';

  const {FileExtension, ...config} = DownloadConfig[formatId];

  const id = Array.isArray(videoId) ? videoId[0] : videoId;

  if (!id) {
    res.statusMessage = 'Video ID is required';
    res.status(400).end();
    return;
  }

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${id}${FileExtension}"`
  );
  ytdl(id, {...config}).pipe(res);
};

export default handler;
