import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LoggedIn from '@/components/sidebar-menu/LoggedIn';
import DocumentChartBar from '../svgs/DocumentChartBar';
import Dashboard from '../svgs/Dashboard';
import BrandTitle from './BrandTitle';
import classNames from 'classnames';

const Menu = () => {
  const menuItems = useMemo(() => [
    { name: 'Dashboard', link: '/', icon: <Dashboard className='w-5 h-5' /> },
    { name: 'Category', link: '/category', icon: <DocumentChartBar className='w-5 h-5' /> }
  ], []);

  const path = usePathname();
  const isActive = (pathname: string) => pathname === path ? 'bg-gray-100' : '';

  return (
    <div className='flex flex-1 flex-col bg-white w-full pb-4 pt-4'>
      <div className='px-6'>
        <BrandTitle />
      </div>

      <div className='flex flex-1 flex-col p-4 pb-0'>
        <ul className='space-y-1.5 flex flex-col flex-1'>
          {menuItems.map(({ name, link, icon }, i) => (
            <li key={i}>
              <Link
                href={link}
                className={classNames(
                  'flex items-center gap-x-3.5 py-2 px-2.5',
                  'text-slate-700 rounded-lg hover:bg-gray-100',
                  isActive(link)
                )}
              >
                {icon}
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <LoggedIn />
      </div>
    </div>
  )
}

export default Menu;