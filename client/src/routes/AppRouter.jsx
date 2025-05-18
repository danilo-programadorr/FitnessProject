import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../context/AuthContext'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore()

  if (loading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login" replace />

  return children
}

export const AppRouter = () => {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}