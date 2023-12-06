import React, { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DocumentChartBar from './svgs/DocumentChartBar';
import Dashboard from './svgs/Dashboard';
import LoggedIn from '@/components/LoggedIn';
import Menu from './svgs/Menu';

const menuItems = [
  { name: 'Dashboard', link: '/', Icon: Dashboard },
  { name: 'Category', link: '/category', Icon: DocumentChartBar }
];

const MobileToggle = () => (
  <div className='sticky top-0 inset-x-0 z-20 bg-white border-y px-4 lg:hidden dark:bg-gray-800 dark:border-gray-700'>
    <div className='flex items-center py-4'>
      <button type='button' className='text-gray-500 hover:text-gray-600' data-hs-overlay='#application-sidebar' aria-controls='application-sidebar' aria-label='Toggle navigation'>
        <span className='sr-only'>Toggle</span>
        <div className='mr-4'>
          <Menu />
        </div>
      </button>

      <a className='flex-none text-xl font-semibold dark:text-white' href='#' aria-label='Brand'>Brand</a>
    </div>
  </div>
)

const BrandTitle = () => (
  <div className='px-6'>
    <a className='flex-none text-xl font-semibold dark:text-white' href='#' aria-label='Brand'>Brand</a>
  </div>
)

const MenuContainer = ({ children }: { children: ReactElement[] }) => (
  <div className='flex flex-1'>
    <nav className='hs-accordion-group p-6 w-full flex flex-col flex-wrap' data-hs-accordion-always-open>
      <ul className='space-y-1.5'>
        {children}
      </ul>
    </nav>
  </div>
)

const SideMenu = () => {
  const path = usePathname();
  const isActive = (pathname: string) => pathname === path ? 'bg-gray-100' : '';
  const menuItemClass = 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600';
  const appSideBarClass = 'flex flex-col hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-4 pb-4 overflow-y-auto lg:flex lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700';

  return (
    <>
      <MobileToggle />
      <div id='application-sidebar' className={appSideBarClass}>
        <BrandTitle />

        <div className='flex flex-1 flex-col'>
          <MenuContainer>
            {menuItems.map(({ name, link, Icon }, i) => (
              <li key={i}>
                <Link href={link} className={`${menuItemClass} ${isActive(link)}`}>
                  <Icon />
                  {name}
                </Link>
              </li>
            ))}
          </MenuContainer>

          <LoggedIn />
        </div>
      </div>
    </>

  );
}

export default SideMenu;