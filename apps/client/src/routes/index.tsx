import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { googleOathSignIn } from '@/services/google-oauth-sign-in'

export const Route = createFileRoute('/')({
  component: SignIn
})

function SignIn(): JSX.Element {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <a href={googleOathSignIn()}>
        <Button>Sign in with Google</Button>
      </a>
    </div>
  )
}
