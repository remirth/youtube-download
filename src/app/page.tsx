import {VideoForm} from './video_form';

export default async function Page() {
  return (
    <>
      <div className="grid auto-cols-auto place-items-center p-4">
        <h1 className="text-center text-2xl font-bold">Youtube MP3 Download</h1>
        <label className="pb-4 text-center">
          Submit the URL of the Youtube audio you wish to download.
        </label>

        <VideoForm />
      </div>
    </>
  );
}
