import { createFileRoute } from '@tanstack/react-router'
import type { JSX } from 'react'

import { CreateGroup } from '@/components/create-group'
import { GroupItem } from '@/components/group-item'
import { useGetGroups } from '@/hooks/use-get-groups'

export const Route = createFileRoute('/app/')({
  component: Index
})

function Index(): JSX.Element {
  const { data } = useGetGroups()

  if (!data) return <div>Loading...</div>

  return (
    <div className="p-4 flex flex-col gap-4 max-w-screen-lg mx-auto">
      <button type="button">Criar novo grupo</button>
      {data.map(g => (
        <GroupItem key={g.id} {...g} />
      ))}

      <CreateGroup />
    </div>
  )
}
