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
          <div className='bg-gray-50 w-full'>
            <SideMenu />
            <div className='flex flex-1 h-full w-full overflow-auto bg-blue-100 p-4 pt-10 px-4 sm:px-6 md:px-8 lg:ps-72'>
              <Component {...pageProps} />
            </div>
          </div>

          <PrelineScript />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}