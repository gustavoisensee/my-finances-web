import { signOut, useSession } from 'next-auth/react';
import styles from '@/styles/buttons.module.css';
import SignOut from '../svgs/SignOut';

export default function LoggedIn() {
  const { data, status } = useSession({ required: true });

  if (status === 'loading') return null

  return (
    <div className='flex flex-col justify-center'>
      <span className='text-center pb-1 text-sm'>
        Welcome {data?.user?.name}
      </span>
      <div className='flex justify-center'>
        <button
          onClick={() => signOut()}
          type='button'
          className='link link-primary flex items-center'
        >
          <SignOut />
          <span className='text-sm pl-1'>
            Logout
          </span>
        </button>
      </div>
    </div>
  )
};
