import { Link, createFileRoute } from '@tanstack/react-router'
import type { JSX } from 'react'

import { Header } from '@/components/haeder'
import { useGetGroupById } from '@/hooks/use-get-group-by-id'
import { useGetGroupTransactionsByGroupId } from '@/hooks/use-get-group-transactions-by-group-id'

export const Route = createFileRoute('/app/$group-id/')({
  component: Group
})

function Group(): JSX.Element {
  const { data } = useGetGroupById()
  const { data: transactions } = useGetGroupTransactionsByGroupId()

  if (!data || !transactions) return <div>Loading...</div>

  return (
    <>
      <Header title={data.name} prevView="/app" />
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        {transactions.map(transaction => (
          <div key={transaction.id}>
            <Link
              to="/app/$group-id/$transaction-id"
              params={{ 'group-id': data.id, 'transaction-id': transaction.id }}
            >
              {transaction.name}
            </Link>
          </div>
        ))}

        <Link
          to="/app/$group-id/$transaction-id"
          params={{ 'group-id': data.id, 'transaction-id': '123' }}
        >
          Go to transaction
        </Link>
      </div>
    </>
  )
}
