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
}
