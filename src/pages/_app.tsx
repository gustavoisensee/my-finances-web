import LoggedIn from '@/components/LoggedIn';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './globals.css';

const queryClient = new QueryClient()

export default function App({
  //@ts-ignore
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <LoggedIn />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}