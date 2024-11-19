import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$group-id/$transaction-id/edit')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return (
    <>
      <Header title="Editar transação" hasBackButton />
    </>
  )
}
