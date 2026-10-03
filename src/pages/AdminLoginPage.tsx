import { Lock } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { BrandLogo } from '@/components/brand/BrandLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { site } from '@/data/siteContent'

export function AdminLoginPage() {
  const { isAuthenticated, login, usesSupabaseAuth } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={site.routes.adminDashboard} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const ok = await login(username.trim(), password)
      if (ok) {
        navigate(site.routes.adminDashboard)
      } else {
        setError(
          usesSupabaseAuth
            ? 'Invalid email or password.'
            : 'Invalid username or password.',
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-stone-texture">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto mb-4 h-20 w-auto" />
          <h1 className="font-serif text-2xl font-semibold text-navy">Admin sign in</h1>
          <p className="mt-2 text-sm text-stone-600">
            Manage festival collection records for {site.themalikkara.title}.
            {usesSupabaseAuth ? ' Sign in with your Supabase Auth user.' : null}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-lg md:p-8"
        >
          <div className="mb-4 flex items-center gap-2 text-parish-blue">
            <Lock className="size-4" />
            <span className="text-sm font-medium">Secure area</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{usesSupabaseAuth ? 'Email' : 'Username'}</Label>
              <Input
                id="username"
                name="username"
                type={usesSupabaseAuth ? 'email' : 'text'}
                autoComplete={usesSupabaseAuth ? 'email' : 'username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="mt-6 w-full" variant="gold" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          <Link to="/" className="text-parish-blue hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
