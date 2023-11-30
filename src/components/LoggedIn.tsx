import { signOut, useSession } from 'next-auth/react';

export default function LoggedIn(){
  const { data } = useSession({ required: true });
  return (
    <div>
      <span>You're logged in as {data?.user?.name}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
};
