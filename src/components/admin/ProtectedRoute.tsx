import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { site } from '@/data/siteContent'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={site.routes.admin} replace state={{ from: location.pathname }} />
  }

  return children
}
