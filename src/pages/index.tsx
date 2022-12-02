import {useRouter} from 'next/router';
import type {Dispatch, FormEvent, SetStateAction} from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {FormatSelections} from '../constants';
import {writeFile} from '../helpers/http';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useSubmit(setIsLoading);
  return (
    <>
      <div className="grid auto-cols-auto place-items-center p-4">
        <h1 className="text-center text-2xl font-bold">Youtube Download</h1>
        <label className="pb-4 text-center">
          Submit the URL of the video you wish to download.
        </label>

        <form
          className="grid w-full auto-cols-auto place-items-center"
          onSubmit={onSubmit}
        >
          <select className="select-primary select w-1/2 bg-gray-300 text-base-100">
            {FormatSelections.map((format, index) => (
              <option key={index} value={format.value}>
                {format.label}
              </option>
            ))}
            ;
          </select>
          <input
            className="input-primary input mt-4 w-5/6 border-none bg-gray-300 text-base-100 focus:border-primary"
            type="url"
            required
            placeholder="https://www.youtube.com/watch?v=vSnCeJEka_s"
          />
          <button
            className="btn-primary btn-wide btn mt-4 text-lg"
            role="submit"
          >
            <Loader isLoading={isLoading} />
          </button>
        </form>
      </div>
    </>
  );
};

const useSubmit = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  const {push} = useRouter();
  return useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const [selection, input] = event.currentTarget.elements as unknown as [
        HTMLSelectElement,
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

      setLoading(true);
      writeFile(videoId, selection.value).catch((error) => {
        console.error(error);
        alert('An error occurred while downloading the video!');
        setLoading(false);
        return;
      });
      setLoading(false);

      push(`/${selection.value}/${videoId}`);
    },
    [push, setLoading]
  );
};
type LoaderProps = {
  isLoading: boolean;
};
const Loader = ({isLoading}: LoaderProps): JSX.Element => {
  if (!isLoading) return <div className="text-lg">To Download...</div>;

  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="mr-2 h-8 w-8 animate-spin fill-white text-base-100"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Page;
