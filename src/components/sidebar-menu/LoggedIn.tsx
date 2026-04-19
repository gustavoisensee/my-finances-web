import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import classNames from 'classnames';

import { auth } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';

export default function LoggedIn() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const displayName =
    user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className='pt-3 border-t border-base-200'>
      <div className='flex items-center gap-3 px-3 py-3 rounded-xl bg-base-200/50'>
        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-base-300 overflow-hidden'>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              referrerPolicy='no-referrer'
              className='w-10 h-10 rounded-full object-cover'
            />
          ) : (
            <User className='w-5 h-5 text-base-content/50' />
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-semibold text-base-content truncate'>
            {displayName}
          </p>
          <p className='text-xs text-base-content/50 truncate'>
            {user?.email ?? ''}
          </p>
        </div>

        <button
          onClick={handleSignOut}
          type='button'
          className={classNames(
            'flex items-center justify-center w-8 h-8 rounded-lg',
            'text-base-content/40 hover:text-error hover:bg-error/10',
            'transition-all duration-200'
          )}
          title='Logout'
        >
          <LogOut className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}
