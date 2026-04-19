import { Outlet, Navigate } from 'react-router-dom'
import classNames from 'classnames'
import SideMenu from '@/components/sidebar-menu/SideMenu'
import Toast from '@/components/shared/Toast'
import Loading from '@/components/shared/Loading'
import { useSidebarStore } from '@/stores/sidebarStore'
import { useAuthContext } from '@/contexts/AuthContext'

export default function MainLayout() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-base-100">
        <Loading />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className='relative min-h-screen w-screen max-w-full bg-base-100'>
      <SideMenu />
      <main className={classNames(
        'flex flex-col min-h-screen',
        'transition-all duration-300 ease-in-out',
        'pt-16 lg:pt-0',
        isCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      )}>
        <div className={classNames(
          'flex flex-1 flex-col m-0',
          isCollapsed ? 'sm:my-3 sm:mr-3 lg:my-4 lg:mr-4' : 'sm:m-3 lg:m-4',
          'bg-base-200/50',
          'rounded-none sm:rounded-2xl lg:rounded-3xl',
          'shadow-lg shadow-base-content/5',
          'border-0 sm:border border-base-300/50',
          'p-3 sm:p-5 lg:p-8',
          'overflow-auto',
          'max-w-[1920px]'
        )}>
          <Outlet />
        </div>
      </main>
      <Toast />
    </div>
  )
}
