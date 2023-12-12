import { SessionProvider } from 'next-auth/react';
import classNames from 'classnames';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import SideMenu from '@/components/sidebar-menu/SideMenu';
import '@/styles/globals.css';
import { Session } from 'next-auth';

const queryClient = new QueryClient();

type Props = {
  Component: React.ElementType,
  pageProps: {
    session: Session,
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: Props) {
  return (
    <div className='flex flex-1'>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <div className='bg-gray-50 w-full'>
            <SideMenu />
            <div className={classNames(
              'flex flex-1 h-full w-full overflow-auto bg-blue-100',
              'p-4 px-4 sm:px-6 md:px-8 lg:ps-72 pt-20 lg:pt-4'
            )}>
              <Component {...pageProps} />
            </div>
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}