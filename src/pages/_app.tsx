import { SessionProvider } from 'next-auth/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SideMenu from '@/components/SideMenu';
import PrelineScript from '@/components/PrelineScript';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({
  //@ts-ignore
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) {
  return (
    <div className='flex flex-1'>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <aside className='w-64 flex-none bg-blue-200 p-4'>
            <SideMenu />
          </aside>
          <main className='min-w-0 flex-1 overflow-auto bg-blue-50 p-4'>
            <Component {...pageProps} />
          </main>
          <PrelineScript />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}