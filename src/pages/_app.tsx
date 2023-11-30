import LoggedIn from '@/components/LoggedIn';
import { SessionProvider, signOut } from 'next-auth/react';

export default function App({
  //@ts-ignore
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <LoggedIn />
      <Component {...pageProps} />
    </SessionProvider>
  )
}