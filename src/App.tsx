import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { apiClient } from '@/lib/api-client'

// Layouts
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

// Pages
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import CategoryPage from '@/pages/CategoryPage'
import MonthPage from '@/pages/MonthPage'

function AppContent() {
  const { getToken } = useAuth()

  useEffect(() => {
    const updateToken = async () => {
      try {
        const token = await getToken()
        apiClient.setAuthToken(token)
      } catch (error) {
        console.error('Error getting token:', error)
      }
    }

    updateToken()
  }, [getToken])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/month/:id" element={<MonthPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return <AppContent />
}


