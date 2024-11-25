import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/haeder'

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
