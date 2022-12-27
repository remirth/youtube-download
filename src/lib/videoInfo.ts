import {type MoreVideoDetails, getBasicInfo, validateID} from 'ytdl-core';
import {InvalidVideoIdError} from '../errors';

export const getVideoDetails = async (
  videoId: string
): Promise<MoreVideoDetails> => {
  if (!validateID(videoId)) {
    throw new InvalidVideoIdError(videoId);
  }

  return getBasicInfo(videoId).then(({videoDetails}) => videoDetails);
};
