import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const NewTransactionRoute = createFileRoute('/new-transaction/')({
  component: NewTransaction
})

function NewTransaction(): JSX.Element {
  return <Header title="Nova transação" hasBackButton />
}
