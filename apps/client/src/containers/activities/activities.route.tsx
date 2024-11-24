import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const ActivitiesRoute = createFileRoute('/activities/')({
  component: Activities
})

function Activities(): JSX.Element {
  return (
    <>
      <Header title="Atividades" />
      'Hello /activities/!'
    </>
  )
}
