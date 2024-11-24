import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const TransactionIdEditRoute = createFileRoute('/$group-id/$transaction-id/edit')({
  component: TransactionIdEdit
})

function TransactionIdEdit(): JSX.Element {
  return <Header title="Editar transação" hasBackButton />
}
