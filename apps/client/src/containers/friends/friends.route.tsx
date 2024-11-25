import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/haeder'

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
