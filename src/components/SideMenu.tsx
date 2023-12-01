import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DocumentChartBar from './svgs/DocumentChartBar';
import Dashboard from './svgs/Dashboard';
import LoggedIn from '@/components/LoggedIn';

const menuItems = [
  { name: 'Dashboard', link: '/', Icon: Dashboard },
  { name: 'Category', link: '/category', Icon: DocumentChartBar }
];

const SideMenu = () => {
  const path = usePathname();
  const isActive = (pathname: string) => pathname === path ? 'bg-gray-100' : '';
  const menuItemClassname = 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600';

  return (
    <>
      <div id='docs-sidebar' className='flex flex-col fixed top-0 start-0 bottom-0 z-[60] bg-white py-4 w-64 open'>
        <div className='px-6'>
          <a className='flex-none text-xl font-semibold dark:text-white' href='#' aria-label='Brand'>My Finances</a>
        </div>
        <nav className='hs-accordion-group p-6 w-full flex flex-1 flex-col flex-wrap' data-hs-accordion-always-open>
          <ul className='space-y-1.5'>
            {menuItems.map(({ name, link, Icon }, i) => (
              <li key={i}>
                <Link href={link} className={`${menuItemClassname} ${isActive(link)}`}>
                  <Icon />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LoggedIn />
      </div>
    </>
  );
}

export default SideMenu;