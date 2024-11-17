import { api } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean
  signIn: (token: string, refreshToken: string) => void
  signOut: () => void
}

const useAuth = create<AuthStore>()(
  devtools(
    set => ({
      isAuthenticated: localStorage.getItem('token') !== null,
      signIn: (token: string, refreshToken: string): void => {
        localStorage.setItem('token', token)
        localStorage.setItem('refresh-token', refreshToken)
        api.defaults.headers.Authorization = `Bearer ${token}`
        set({ isAuthenticated: true })
      },
      signOut: (): void => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token')
        api.defaults.headers.Authorization = ''
        set({ isAuthenticated: false })
      }
    }),
    { name: 'AUTH_STORE' }
  )
)

export function useIsAuthenticated(): boolean {
  return useAuth(s => s.isAuthenticated)
}

export function useSignIn(): (token?: string, refreshToken?: string) => void {
  const navigate = useNavigate()
  const signIn = useAuth(s => s.signIn)
  const signOut = useSignOut()
  return (token, refreshToken): void => {
    if (!token || !refreshToken) {
      signOut()
      return
    }
    signIn(token, refreshToken)
    navigate({ to: '/app' })
  }
}

export function useSignOut(): () => void {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const signOut = useAuth(s => s.signOut)
  return (): void => {
    signOut()
    queryClient.clear()
    navigate({ to: '/' })
  }
}
