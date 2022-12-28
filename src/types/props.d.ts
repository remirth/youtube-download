declare module 'props' {
  import type {MoreVideoDetails} from 'ytdl-core';

  export type VideoIdProps = {
    videoId: string;
  };

  export type ChildrenProps = {
    children: React.ReactNode;
  };

  export type FormatProps = {
    format: string;
  };

  export type VideoDetailsProps = {
    details: MoreVideoDetails;
  };

  export type ClassNameProps = {
    className?: string;
  };

  export type Palette =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'base-100'
    | 'base-200'
    | 'base-300'
    | 'accent'
    | 'neutral';
}
