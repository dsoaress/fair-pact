import { createFileRoute } from '@tanstack/react-router'

// import { cn } from '@/lib/utils'
// import { formatPrice } from '@/utils/format-price'
import { Header } from '@/components/haeder'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetGroups } from '@/hooks/use-get-groups'

import { CreateGroup } from './components/create-group'
import { GroupItem } from './components/group-item'

export const GroupsRoute = createFileRoute('/')({
  component: Groups
})

function Groups(): JSX.Element {
  const { data } = useGetGroups()

  if (!data) return <div>Loading...</div>

  return (
    <>
      <Header title="Grupos">
        {/* {data.userBalance.map(([currency, balance]) => {
          const { formattedPrice, type } = formatPrice({ price: balance, currency })
          return (
            <span
              key={currency}
              className={cn({
                'text-green-500': type === 'POSITIVE',
                'text-red-500': type === 'NEGATIVE'
              })}
            >
              {formattedPrice}
            </span>
          )
        })} */}
        <CreateGroup />
      </Header>
      <ScrollArea>
        <div className="flex flex-col gap-4 mx-auto mt-16">
          {data.groups.map(g => (
            <GroupItem key={g.id} {...g} />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
