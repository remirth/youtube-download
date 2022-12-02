import type {DownloadConfig} from './download';

export type FormatSelection = {
  value: keyof typeof DownloadConfig;
  label: string;
};

export const FormatSelections = [
  {
    value: 'audio',
    label: 'Audio',
  },
  {
    value: 'video',
    label: 'Video',
  },
] as const satisfies readonly FormatSelection[];
