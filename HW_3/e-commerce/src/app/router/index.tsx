import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@widgets/Layout'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '@features/auth/model/authSlice'

const LoginPage = React.lazy(() => import('@pages/LoginPage'))
const RegisterPage = React.lazy(() => import('@pages/RegisterPage'))
const DashboardPage = React.lazy(() => import('@pages/DashboardPage'))
const ProductsPage = React.lazy(() => import('@pages/ProductsPage'))
const ProductDetailsPage = React.lazy(() => import('@pages/ProductDetailsPage'))
const ProfilePage = React.lazy(() => import('@pages/ProfilePage'))
const SettingsPage = React.lazy(() => import('@pages/SettingsPage'))
const NotFoundPage = React.lazy(() => import('@pages/NotFoundPage'))

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}