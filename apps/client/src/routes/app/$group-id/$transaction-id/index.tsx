import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'

import { Header } from '@/components/haeder'
import { Button } from '@/components/ui/button'
import { useGetGroupTransactionById } from '@/hooks/use-get-group-transaction-by-id'

export const Route = createFileRoute('/app/$group-id/$transaction-id/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
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
              from: '/app/$group-id/$transaction-id',
              to: '/app/$group-id/$transaction-id/edit'
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
