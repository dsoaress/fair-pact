import { useSignIn } from '@/hooks/use-auth'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

type Params = {
  token?: string
  'refresh-token'?: string
  error?: string
}

export const Route = createFileRoute('/sign-in/')({
  component: SignIn,
  validateSearch: (params: Params): Params => {
    return {
      token: params.token,
      'refresh-token': params['refresh-token'],
      error: params.error
    }
  }
})

function SignIn(): null {
  const { token, 'refresh-token': refreshToken } = useSearch({
    from: '/sign-in/'
  })
  const signIn = useSignIn()

  useEffect(() => {
    signIn(token, refreshToken)
  }, [token, refreshToken, signIn])

  return null
}
