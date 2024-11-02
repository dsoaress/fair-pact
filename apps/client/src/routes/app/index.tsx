import { useGetGroups } from '@/services/get-groups'
import { Link, createFileRoute } from '@tanstack/react-router'
import type { JSX } from 'react'

export const Route = createFileRoute('/app/')({
  component: Index
})

function Index(): JSX.Element {
  const { data } = useGetGroups()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {data.map(group => (
        <div key={group.id}>
          <Link to="/app/$group-id" params={{ 'group-id': group.id }}>
            {group.name}
          </Link>
          <p>{group.currency}</p>
        </div>
      ))}
    </div>
  )
}
