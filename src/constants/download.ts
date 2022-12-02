export type Config = {
  FileExtension: 'mp3' | 'mp4';
  filter: 'audioonly' | undefined;
  quality: 'highestaudio' | 'highestvideo';
  Title: 'Audio' | 'Video';
};

const videoConfig = {
  FileExtension: 'mp4',
  filter: undefined,
  quality: 'highestvideo',
  Title: 'Video',
} as const satisfies Config;

const audioConfig = {
  FileExtension: 'mp3',
  filter: 'audioonly',
  quality: 'highestaudio',
  Title: 'Audio',
} as const satisfies Config;

export const DownloadConfig = {
  video: videoConfig,
  audio: audioConfig,
} as const;
