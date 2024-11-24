import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'

import { Header } from '@/components/haeder'
import { Button } from '@/components/ui/button'
import { useGetGroupTransactionById } from '@/hooks/use-get-group-transaction-by-id'

export const TransactionIdRoute = createFileRoute('/$group-id/$transaction-id/')({
  component: TransactionId
})

function TransactionId(): JSX.Element {
  const navigate = useNavigate()
  const { data } = useGetGroupTransactionById()

  if (!data) return <div>Loading...</div>

  return (
    <>
      <Header title={data.name} hasBackButton>
        <Button
          size="icon"
          variant="link"
          aria-label="editar transação"
          className="text-white"
          onClick={(): Promise<void> =>
            navigate({
              from: '/$group-id/$transaction-id',
              to: '/$group-id/$transaction-id/edit'
            })
          }
        >
          <Pencil />
        </Button>
      </Header>
      <pre>{JSON.stringify(data, null, 2)}</pre>{' '}
    </>
  )
}
