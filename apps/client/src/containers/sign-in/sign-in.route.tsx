import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useSignIn } from '@/hooks/use-auth'

import { googleOathSignIn } from './services/google-oauth-sign-in'

type Params = {
  token?: string
  'refresh-token'?: string
  error?: string
}

export const SignInRoute = createFileRoute('/sign-in/')({
  component: SignIn,
  validateSearch: (params: Params): Params => {
    return {
      token: params.token,
      'refresh-token': params['refresh-token'],
      error: params.error
    }
  }
})

function SignIn(): JSX.Element {
  const { token, 'refresh-token': refreshToken } = useSearch({
    from: '/sign-in/'
  })
  const signIn = useSignIn()

  useEffect(() => {
    signIn(token, refreshToken)
  }, [token, refreshToken, signIn])

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <a href={googleOathSignIn()}>
        <Button>Sign in with Google</Button>
      </a>
    </div>
  )
}
