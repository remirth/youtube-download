import Link from 'next/link';

export const DownloadBack = (): JSX.Element => {
  return (
    <Link href={'/'}>
      <button className="btn-secondary btn-sm btn w-16">Back</button>
    </Link>
  );
};
