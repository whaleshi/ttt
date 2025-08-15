import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement } from 'react';
import Head from 'next/head';
import "@/i18n"
import { useEffect, useState } from 'react';
import LoadingAnimation from '@/components/common/Loading';
import { WagmiProvider } from 'wagmi'
import { HeroUIProvider } from '@heroui/react'
import QueryProvider from '@/providers/QueryProvider'
import PrivyProviders from '@/providers/PrivyProvider'
import { BalanceProvider } from '@/providers/BalanceProvider'
import { EchoProvider } from '@/providers/EchoProvider';
import { Toaster } from 'sonner';

import { config } from '../wagmiConfig'

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactElement;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useEffect(() => {
    import('./create')
    import('./meme/[address]')
    import('./create')
  }, [])
  const getLayout = Component.getLayout ?? ((page) => page);

  // 首次加载全屏 Loading（仅在本次会话第一次进入时显示）
  // SSR 阶段不渲染遮罩，避免影响服务端抓取
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') return false; // SSR: 不显示
    try { return sessionStorage.getItem('appLoaded') === '1' ? false : true; } catch { return true; }
  });
  const [hiding, setHiding] = useState(false);
  useEffect(() => {
    // 已经加载过则不再显示
    if (typeof window !== 'undefined' && sessionStorage.getItem('appLoaded') === '1') {
      setShowLoader(false);
      return;
    }

    let done = false;
    const minMs = 700; // 最短显示时长，避免闪烁
    const maxMs = 2500; // 最长等待上限，避免卡住
    const minDelay = new Promise<void>((r) => setTimeout(r, minMs));
    const fontsReady: Promise<any> = (typeof document !== 'undefined' && (document as any).fonts)?.ready ?? Promise.resolve();

    const finish = () => {
      if (done) return;
      done = true;
      setHiding(true);
      // 等待淡出动画结束后卸载
      const timer = setTimeout(() => {
        setShowLoader(false);
        try { sessionStorage.setItem('appLoaded', '1'); } catch { }
        clearTimeout(timer);
      }, 320);
    };

    Promise.all([minDelay, fontsReady]).then(finish);
    const maxTimer = setTimeout(finish, maxMs);
    return () => clearTimeout(maxTimer);
  }, []);
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
                  <Toaster richColors position="top-center" />
                  {getLayout(<Component {...pageProps} />)}
                  {showLoader && (
                    <div
                      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#07060A] transition-opacity duration-300 ${hiding ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <LoadingAnimation />
                        <div className="text-white/70 text-xs tracking-wide">Loading…</div>
                      </div>
                    </div>
                  )}
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