import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AuthProvider } from '@/context/AuthContext'
import { FinancialProvider } from '@/context/FinancialContext'
import { AdminDashboardPage } from '@/pages/AdminDashboardPage'
import { AdminLoginPage } from '@/pages/AdminLoginPage'
import { FinancialDashboardPage } from '@/pages/FinancialDashboardPage'
import { HomePage } from '@/pages/HomePage'
import { site } from '@/data/siteContent'

function App() {
  return (
    <AuthProvider>
      <FinancialProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={site.routes.financial} element={<FinancialDashboardPage />} />
            <Route path={site.routes.admin} element={<AdminLoginPage />} />
            <Route
              path={site.routes.adminDashboard}
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </FinancialProvider>
    </AuthProvider>
  )
}

export default App
