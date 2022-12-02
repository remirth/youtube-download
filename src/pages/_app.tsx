import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type AppType} from 'next/dist/shared/lib/utils';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';

import '../styles/globals.css';
import {Container} from './components/container';
import {useState} from 'react';

const MyApp: AppType = ({Component, pageProps}) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Youtube Download</title>
        <meta
          name="description"
          content="Use this page to download Youtube videos locally"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNProgress />

      <Container>
        <Component {...pageProps} />
      </Container>
    </QueryClientProvider>
  );
};

export default MyApp;
