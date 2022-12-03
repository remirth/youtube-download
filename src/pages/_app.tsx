import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type AppType} from 'next/dist/shared/lib/utils';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
// eslint-disable-next-line camelcase
import {JetBrains_Mono} from '@next/font/google';

import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.css';
import {Container} from '../components';
import {useState} from 'react';

const jetBrains = JetBrains_Mono();
const MyApp: AppType = ({Component, pageProps}) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Youtube MP3 Download</title>
        <meta
          name="description"
          content="Use this page to download the audio from a Youtube video."
        />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          html {
            font-family: ${jetBrains.style.fontFamily};
          }
        `}</style>
      </Head>

      <NextNProgress color="#F28C18" />

      <Container>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  );
};

export default MyApp;
