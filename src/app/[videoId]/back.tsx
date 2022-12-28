import Link from 'next/link';
import type {ClassNameProps} from 'props';

export const DownloadBack = ({className}: ClassNameProps): JSX.Element => {
  return (
    <Link href={'/'} className={className ?? ''}>
      <button className="btn-secondary btn-sm btn w-16">Back</button>
    </Link>
  );
};
