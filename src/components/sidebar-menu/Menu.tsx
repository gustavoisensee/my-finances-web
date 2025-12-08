import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PanelLeftClose, LayoutDashboard, FolderKanban, Moon, Sun } from 'lucide-react';
import classNames from 'classnames';

import LoggedIn from '@/components/sidebar-menu/LoggedIn';
import BrandTitle from './BrandTitle';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useThemeStore } from '@/stores/themeStore';

const Menu = () => {
  const menuItems = useMemo(() => [
    { name: 'Dashboard', link: '/dashboard', icon: LayoutDashboard },
    { name: 'Category', link: '/category', icon: FolderKanban }
  ], []);

  const location = useLocation();
  const isActive = (pathname: string) => pathname === location.pathname;
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className='flex flex-1 flex-col bg-base-100 w-full'>
      {/* Header */}
      <div className='px-3 py-4 lg:pr-0 flex items-center justify-between border-b border-base-200'>
        <BrandTitle />
        <button
          onClick={toggleSidebar}
          className={classNames(
            'hidden lg:flex items-center justify-center w-8 h-8',
            'rounded-lg hover:bg-base-200 transition-all duration-200',
            'text-base-content/50 hover:text-base-content/70'
          )}
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Navigation */}
      <div className='flex flex-1 flex-col px-3 py-4 lg:pr-0'>
        <p className='px-3 mb-2 text-xs font-semibold text-base-content/40 uppercase tracking-wider'>
          Menu
        </p>
        <nav className='space-y-1 flex flex-col flex-1'>
          {menuItems.map(({ name, link, icon: Icon }, i) => (
            <Link
              key={i}
              to={link}
              className={classNames(
                'flex items-center gap-3 py-2.5 px-3 rounded-xl',
                'transition-all duration-200 group',
                isActive(link)
                  ? 'bg-primary text-primary-content shadow-md shadow-primary/25'
                  : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
              )}
            >
              <Icon className={classNames(
                'w-5 h-5 transition-transform duration-200',
                !isActive(link) && 'group-hover:scale-110'
              )} />
              <span className='font-medium'>{name}</span>
            </Link>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className='px-3 py-3 border-t border-base-200'>
          <button
            onClick={toggleTheme}
            className={classNames(
              'flex items-center justify-between w-full py-2.5 px-3 rounded-xl',
              'text-base-content/70 hover:bg-base-200 hover:text-base-content',
              'transition-all duration-200'
            )}
          >
            <div className='flex items-center gap-3'>
              {theme === 'light' ? (
                <Moon className='w-5 h-5' />
              ) : (
                <Sun className='w-5 h-5' />
              )}
              <span className='font-medium'>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div className={classNames(
              'relative w-11 h-6 rounded-full transition-colors duration-200',
              theme === 'dark' ? 'bg-primary' : 'bg-base-300'
            )}>
              <div className={classNames(
                'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              )} />
            </div>
          </button>
        </div>

        {/* User section */}
        <LoggedIn />
      </div>
    </div>
  )
}

export default Menu;
