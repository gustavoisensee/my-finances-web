import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import SignOut from '../svgs/SignOut';

export default function LoggedIn() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  if (!isLoaded) return null

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className='flex flex-col justify-center'>
      <span className='text-center pb-1 text-sm'>
        Welcome {user?.firstName || user?.emailAddresses[0]?.emailAddress}
      </span>
      <div className='flex justify-center'>
        <button
          onClick={handleSignOut}
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
}
