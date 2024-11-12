import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/account/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return (
    <>
      <Header title="Conta" />
      'Hello /app/account/!'
    </>
  )
}
