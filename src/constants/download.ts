export type Config = {
  FileExtension: '.mp3' | '.mp4';
  filter: 'audioonly' | 'videoonly';
  quality: 'highestaudio' | 'highestvideo';
  Title: 'Audio' | 'Video';
};

const videoConfig = {
  FileExtension: '.mp4',
  filter: 'videoonly',
  quality: 'highestvideo',
  Title: 'Video',
// eslint-disable-next-line prettier/prettier
} as const satisfies Config;

const audioConfig = {
  FileExtension: '.mp3',
  filter: 'audioonly',
  quality: 'highestaudio',
  Title: 'Audio',
} as const satisfies Config;

export const DownloadConfig = {
  video: videoConfig,
  audio: audioConfig,
} as const;
