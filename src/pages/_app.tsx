import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { Flex, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { rtlCache } from '@/lib/rtl-cache';
import { Navbar } from '@/components';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from "next-auth/react"
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps: pg } = props;
  const { session, ...pageProps } = pg;

  const pathname = props.router.pathname;

  return (
    <div>
      <MantineProvider
        theme={{ dir: 'ltr', colorScheme: 'dark', primaryColor: 'indigo' }}
        withGlobalStyles
        withNormalizeCSS
      // emotionCache={rtlCache}
      >
        <ModalsProvider>
          <RecoilRoot>
            <SessionProvider session={session}>
              <Notifications />
              {pathname.startsWith("/auth") || pathname === "/" ? (
                <Component {...pageProps} />
              ) : (
                <div className='flex flex-row w-screen h-screen'>
                  <Navbar />
                  <main className="overflow-hidden">
                    <Component {...pageProps} />
                  </main>
                </div>
              )}
            </SessionProvider>
          </RecoilRoot>
        </ModalsProvider>
      </MantineProvider>
    </div>
  );
}
