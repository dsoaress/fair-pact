import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/friends/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return (
    <>
      <Header title="Amigos" />
      'Hello /friends/!'
    </>
  )
}
