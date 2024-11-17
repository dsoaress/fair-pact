import { useSignIn, useSignOut } from '@/hooks/use-auth'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

type Params = {
  token?: string
  'refresh-token'?: string
  error?: string
}

export const Route = createFileRoute('/login/')({
  component: Login,
  validateSearch: (params: Params): Params => {
    return {
      token: params.token,
      'refresh-token': params['refresh-token'],
      error: params.error
    }
  }
})

function Login(): null {
  const { token, 'refresh-token': refreshToken } = useSearch({ from: '/login/' })
  const signIn = useSignIn()
  const signOut = useSignOut()

  useEffect(() => {
    if (token && refreshToken) signIn(token, refreshToken)
    else signOut()
  }, [token, refreshToken, signIn, signOut])

  return null
}
