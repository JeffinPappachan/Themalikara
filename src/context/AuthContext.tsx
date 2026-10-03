import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'

const LEGACY_SESSION_KEY = 'themalikkara-admin-session'

type AuthContextValue = {
  isAuthenticated: boolean
  usesSupabaseAuth: boolean
  login: (identifier: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function expectedLegacyCredentials() {
  const username = import.meta.env.VITE_ADMIN_USERNAME ?? 'admin'
  const password = import.meta.env.VITE_ADMIN_PASSWORD ?? 'themalikkara'
  return { username, password }
}

function readLegacySession() {
  return sessionStorage.getItem(LEGACY_SESSION_KEY) === 'authenticated'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const usesSupabaseAuth = isSupabaseConfigured()
  const [isAuthenticated, setIsAuthenticated] = useState(
    usesSupabaseAuth ? false : readLegacySession,
  )

  useEffect(() => {
    if (!usesSupabaseAuth) return

    const supabase = getSupabaseClient()
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session))
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session))
    })

    return () => subscription.subscription.unsubscribe()
  }, [usesSupabaseAuth])

  const login = useCallback(
    async (identifier: string, password: string) => {
      if (usesSupabaseAuth) {
        const supabase = getSupabaseClient()
        if (!supabase) return false
        const { error } = await supabase.auth.signInWithPassword({
          email: identifier.trim(),
          password,
        })
        if (error) return false
        setIsAuthenticated(true)
        return true
      }

      const expected = expectedLegacyCredentials()
      if (identifier === expected.username && password === expected.password) {
        sessionStorage.setItem(LEGACY_SESSION_KEY, 'authenticated')
        setIsAuthenticated(true)
        return true
      }
      return false
    },
    [usesSupabaseAuth],
  )

  const logout = useCallback(async () => {
    if (usesSupabaseAuth) {
      const supabase = getSupabaseClient()
      if (supabase) await supabase.auth.signOut()
    } else {
      sessionStorage.removeItem(LEGACY_SESSION_KEY)
    }
    setIsAuthenticated(false)
  }, [usesSupabaseAuth])

  const value = useMemo(
    () => ({ isAuthenticated, usesSupabaseAuth, login, logout }),
    [isAuthenticated, usesSupabaseAuth, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
