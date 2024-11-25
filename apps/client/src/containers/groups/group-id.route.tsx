import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

import { Header } from '@/components/haeder'

import { transactionsColumns } from './components/transactions-columns'
import { TransactionsTable } from './components/transactions-table'
import { useGetGroupById } from './hooks/use-get-group-by-id'
import { useGetGroupTransactionsByGroupId } from './hooks/use-get-group-transactions-by-group-id'
import { getGroupTransactionsByGroupIdSearchParams } from './utils/get-group-transactions-by-group-id-search-params'

export const GroupIdRoute = createFileRoute('/$group-id/')({
  component: GroupId,
  validateSearch: zodValidator(getGroupTransactionsByGroupIdSearchParams)
})

function GroupId(): JSX.Element {
  const { data } = useGetGroupById()
  const { data: transactions } = useGetGroupTransactionsByGroupId()

  if (!data) return <div>Loading...</div>

  return (
    <>
      <Header title={data.name} hasBackButton />
      <div className="container mx-auto py-10 pt-20">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <TransactionsTable
          columns={transactionsColumns}
          data={transactions || []}
          filterColumn="name"
          filterPlaceholder="Filter transactions..."
        />
      </div>
    </>
  )
}
