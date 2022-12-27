import type {MoreVideoDetails} from 'ytdl-core';

export const fetchVideoDetailsStatic = async (
  videoId: string
): Promise<MoreVideoDetails | undefined> => {
  if (!videoId) return;
  return fetch(new URL(`/api/video_details/${videoId}`)).then((res) =>
    res.json()
  );
};
