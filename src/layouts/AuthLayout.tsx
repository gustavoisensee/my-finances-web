import { Outlet, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

export default function AuthLayout() {
  return (
    <>
      <SignedOut>
        <div className="flex min-h-screen w-full">
          <Outlet />
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
    </>
  )
}


