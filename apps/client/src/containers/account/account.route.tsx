import { Button } from '@/components/ui/button'

import { Header } from '@/components/haeder'
import { useSignOut } from '@/hooks/use-auth'
import { createFileRoute } from '@tanstack/react-router'

import { useGetUserProfile } from './hooks/use-get-user-profile'

export const AccountRoute = createFileRoute('/account/')({
  component: Account
})

function Account(): JSX.Element {
  const { data } = useGetUserProfile()
  const signOut = useSignOut()

  return (
    <>
      <Header title="Conta" />
      <div className="mt-16">
        <div className="text-lg font-semibold">
          {data?.firstName} {data?.lastName}
        </div>
        <Button variant="destructive" onClick={signOut}>
          Sair
        </Button>
      </div>
    </>
  )
}
