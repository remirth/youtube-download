'use client';
import {useRouter} from 'next/navigation';
import {type FormEvent, useCallback} from 'react';

export const VideoForm = (): JSX.Element => {
  const onSubmit = useSubmit();
  return (
    <form
      className="grid w-full auto-cols-auto place-items-center"
      onSubmit={onSubmit}
    >
      <input
        className="input-primary input mt-4 w-5/6 border-none bg-gray-300 text-base-100 focus:border-primary"
        type="url"
        name="url"
        required
        placeholder="https://www.youtube.com/watch?v=coY2IA-oBvw"
      />
      <button className="btn-primary btn-wide btn mt-4 text-lg" role="submit">
        To Download
      </button>
    </form>
  );
};

const useSubmit = () => {
  const {push} = useRouter();
  return useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const urlObj = new URL(formData.get('url') as string);
      const videoId = urlObj.searchParams.get('v') || urlObj.pathname.slice(1);

      if (!videoId) {
        alert('URL is missing video ID!');
        return;
      }

      push(`/download/${videoId}`);
    },
    [push]
  );
};
