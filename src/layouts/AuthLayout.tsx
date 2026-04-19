import { Outlet, Navigate } from 'react-router-dom'

import Loading from '@/components/shared/Loading'
import { useAuthContext } from '@/contexts/AuthContext'

export default function AuthLayout() {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-base-200">
        <Loading />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen w-full">
      <Outlet />
    </div>
  )
}
