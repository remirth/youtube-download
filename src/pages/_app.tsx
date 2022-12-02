import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type AppType} from 'next/dist/shared/lib/utils';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';

import '../styles/globals.css';
import '@fontsource/jetbrains-mono';
import {Container} from '../components';
import {useState} from 'react';

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
      </Head>

      <NextNProgress color="#F28C18" />

      <Container>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  );
};

export default MyApp;
