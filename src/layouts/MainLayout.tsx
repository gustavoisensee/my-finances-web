import { Outlet, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import classNames from 'classnames'
import SideMenu from '@/components/sidebar-menu/SideMenu'
import Toast from '@/components/shared/Toast'

export default function MainLayout() {
  return (
    <>
      <SignedIn>
        <div className='flex flex-1'>
          <div className='bg-gray-50 w-full'>
            <SideMenu />
            <div className={classNames(
              'flex flex-1 h-full w-full overflow-auto bg-blue-100',
              'p-4 px-4 sm:px-6 md:px-8 lg:ps-72 pt-20 lg:pt-4'
            )}>
              <Outlet />
            </div>
            <Toast />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  )
}


