import { Outlet, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import classNames from 'classnames'
import SideMenu from '@/components/sidebar-menu/SideMenu'
import Toast from '@/components/shared/Toast'
import { useSidebarStore } from '@/stores/sidebarStore'

export default function MainLayout() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <>
      <SignedIn>
        <div className='relative min-h-screen w-screen max-w-full bg-base-100'>
          <SideMenu />
          <main className={classNames(
            'flex flex-col min-h-screen',
            'transition-all duration-300 ease-in-out',
            'pt-20 lg:pt-0',
            isCollapsed ? 'lg:pl-16' : 'lg:pl-64'
          )}>
            {/* Floating content card */}
            <div className={classNames(
              'flex flex-1 flex-col m-0',
              isCollapsed ? 'sm:my-3 sm:mr-3 lg:my-4 lg:mr-4' : 'sm:m-3 lg:m-4',
              'bg-base-200/50',
              'rounded-none sm:rounded-2xl lg:rounded-3xl',
              'shadow-lg shadow-base-content/5',
              'border-0 sm:border border-base-300/50',
              'p-3 sm:p-5 lg:p-8',
              'overflow-auto'
            )}>
              <Outlet />
            </div>
          </main>
          <Toast />
        </div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  )
}
