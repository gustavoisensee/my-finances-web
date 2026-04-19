import classNames from 'classnames';
import { PanelLeftOpen, User } from 'lucide-react';

import Menu from './Menu';
import MobileMenu from './MobileMenu';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useAuthContext } from '@/contexts/AuthContext';

const DesktopMenu = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const { user } = useAuthContext();

  return (
    <>
      <div
        className={classNames(
          'hidden lg:flex flex-col fixed top-0 start-0 bottom-0 w-16',
          'bg-base-100',
          'items-center py-5 z-40',
          'transition-opacity duration-300 ease-in-out',
          isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <button
          onClick={toggleSidebar}
          className={classNames(
            'flex items-center justify-center w-10 h-10',
            'rounded-xl hover:bg-base-200 transition-all duration-200',
            'text-base-content/50 hover:text-base-content/70'
          )}
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>

        <div className='flex-1' />

        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-base-200 overflow-hidden'>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              referrerPolicy='no-referrer'
              className='w-10 h-10 rounded-full object-cover'
            />
          ) : (
            <User className='w-5 h-5 text-base-content/50' />
          )}
        </div>
      </div>

      <div
        className={classNames(
          'hidden flex-col fixed top-0 start-0 bottom-0 w-64',
          'bg-base-100 overflow-y-auto',
          'lg:flex transition-all duration-300 ease-in-out z-40',
          isCollapsed ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        )}
      >
        <Menu />
      </div>
    </>
  );
};

const SideMenu = () => {
  return (
    <>
      <MobileMenu />
      <DesktopMenu />
    </>
  );
};

export default SideMenu;
