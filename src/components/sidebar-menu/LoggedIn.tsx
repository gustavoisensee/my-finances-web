import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import classNames from 'classnames';

export default function LoggedIn() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  if (!isLoaded) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const displayName = user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User';

  return (
    <div className='pt-3 border-t border-base-200'>
      <div className='flex items-center gap-3 px-3 py-3 rounded-xl bg-base-200/50'>
        {/* Avatar */}
        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-base-300 overflow-hidden'>
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={displayName}
              className='w-10 h-10 rounded-full object-cover'
            />
          ) : (
            <User className='w-5 h-5 text-base-content/50' />
          )}
        </div>

        {/* Info */}
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-semibold text-base-content truncate'>
            {displayName}
          </p>
          <p className='text-xs text-base-content/50 truncate'>
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>

        {/* Logout button */}
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
