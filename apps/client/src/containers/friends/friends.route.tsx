import { Header } from '@/components/haeder'
import { createFileRoute } from '@tanstack/react-router'

export const FriendsRoute = createFileRoute('/friends/')({
  component: Friends
})

function Friends(): JSX.Element {
  return (
    <>
      <Header title="Amigos" />
      'Hello /friends/!'
    </>
  )
}
