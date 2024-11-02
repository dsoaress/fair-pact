import { useGetGroupById } from '@/services/get-group-by-id'
import { createFileRoute } from '@tanstack/react-router'
import type { JSX } from 'react'

export const Route = createFileRoute('/app/$group-id')({
  component: Group
})

function Group(): JSX.Element {
  const { data } = useGetGroupById()

  if (!data) {
    return <div>Loading...</div>
  }

  return <>{data.name}</>
}
