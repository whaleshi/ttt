import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement } from 'react';
import Head from 'next/head';
import "@/i18n"
import { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi'
import { HeroUIProvider } from '@heroui/react'
import QueryProvider from '@/providers/QueryProvider'
import PrivyProviders from '@/providers/PrivyProvider'
import { BalanceProvider } from '@/providers/BalanceProvider'
import { EchoProvider } from '@/providers/EchoProvider';

import { config } from '../wagmiConfig'

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactElement;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useEffect(() => {

  }, [])
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>Origin</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <WagmiProvider config={config}>
        <PrivyProviders>
          <QueryProvider>
            <BalanceProvider>
              <EchoProvider>
                <HeroUIProvider>
                  {getLayout(<Component {...pageProps} />)}
                </HeroUIProvider>
              </EchoProvider>
            </BalanceProvider>
          </QueryProvider>
        </PrivyProviders>
      </WagmiProvider>
    </>
  );
}


export default App;