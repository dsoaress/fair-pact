import { Header } from '@/components/haeder'
import { Button } from '@/components/ui/button'
import { useSignOut } from '@/hooks/use-auth'
import { useGetUserProfile } from '@/hooks/use-get-user-profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/account/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
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
