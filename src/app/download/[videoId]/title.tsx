import type {VideoDetailsProps} from 'props';
import {truncate} from './lib';
export const DownloadTitle = ({details}: VideoDetailsProps) => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">
        {truncate(details.title ?? 'Title', 45)}
      </h1>
    </>
  );
};
