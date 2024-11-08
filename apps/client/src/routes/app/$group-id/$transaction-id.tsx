import { createFileRoute } from '@tanstack/react-router'

import { useGetGroupTransactionById } from '@/hooks/use-get-group-transaction-by-id'

export const Route = createFileRoute('/app/$group-id/$transaction-id')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  const { data } = useGetGroupTransactionById()

  if (!data) return <div>Loading...</div>

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>{' '}
      {new Date(data.date).toLocaleDateString('pt-BR', {
        dateStyle: 'full'
      })}
    </div>
  )
}
