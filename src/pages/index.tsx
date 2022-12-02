import {useRouter} from 'next/router';
import type {FormEvent} from 'react';
import {useCallback} from 'react';

const Page = () => {
  const onSubmit = useSubmit();
  return (
    <>
      <div className="grid auto-cols-auto place-items-center p-4">
        <h1 className="text-center text-2xl font-bold">Youtube MP3 Download</h1>
        <label className="pb-4 text-center">
          Submit the URL of the Youtube audio you wish to download.
        </label>

        <form
          className="grid w-full auto-cols-auto place-items-center"
          onSubmit={onSubmit}
        >
          <input
            className="input-primary input mt-4 w-5/6 border-none bg-gray-300 text-base-100 focus:border-primary"
            type="url"
            required
            placeholder="https://www.youtube.com/watch?v=iA4LKxj81zc"
          />
          <button
            className="btn-primary btn-wide btn mt-4 text-lg"
            role="submit"
          >
            To Download
          </button>
        </form>
      </div>
    </>
  );
};

const useSubmit = () => {
  const {push} = useRouter();
  return useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const [input] = event.currentTarget.elements as unknown as [
        HTMLInputElement
      ];
      const url = input.value;

      const urlObj = new URL(url);
      let videoId = '';
      if (urlObj.protocol !== 'https:') return;
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') ?? '';
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else {
        alert('URL is not a valid Youtube video!');
        return;
      }

      if (!videoId) {
        alert('URL is missing video ID!');
        return;
      }

      push(`/${videoId}`);
    },
    [push]
  );
};

export default Page;
