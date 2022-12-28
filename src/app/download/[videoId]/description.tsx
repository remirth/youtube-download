import type {VideoDetailsProps} from 'props';
import {truncate} from './lib';
export const DownloadDescription = ({details}: VideoDetailsProps) => {
  return <div>{truncate(details?.description ?? 'Video Description', 60)}</div>;
};
