import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/activities/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return (
    <>
      <Header title="Atividades" />
      'Hello /app/activities/!'
    </>
  )
}
