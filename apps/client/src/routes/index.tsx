import { googleOathLogin } from '@/services/google-oauth-login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Login
})

function Login(): JSX.Element {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <a href={googleOathLogin()}>
        <button type="button">Login with Google</button>
      </a>
    </div>
  )
}
