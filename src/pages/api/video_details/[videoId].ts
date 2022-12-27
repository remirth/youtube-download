import type {NextApiRequest, NextApiResponse} from 'next/types';
import {getVideoDetails} from '../../../lib/videoInfo';
import {getFirstOrDefault} from '../../../lib/utils';
import {InvalidVideoIdError} from '../../../errors';

const handler = ({method, query}: NextApiRequest, res: NextApiResponse) => {
  if (!['GET'].includes(method ?? '')) {
    res.statusMessage = 'Method not allowed';
    res.status(405).end();
    return;
  }

  const videoId = getFirstOrDefault(query['videoId'], '');

  getVideoDetails(videoId)
    .then((videoDetails) => {
      res.status(200).json(videoDetails);
    })
    .catch((error) => {
      console.log('ass');
      res.statusMessage = error.message;

      if (error instanceof InvalidVideoIdError) {
        res.status(400).end();
        return;
      }

      res.status(500).end();
    });
};
export default handler;
