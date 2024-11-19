import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transaction/')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return <Header title="Nova transação" hasBackButton />
}
