import { Link } from '@tanstack/react-router'
import type { GetGroupsOutputDto } from 'contracts'

import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/format-price'

export function GroupItem({ id, name, currency, balance }: GetGroupsOutputDto[0]): JSX.Element {
  const { formattedPrice, type } = formatPrice({ price: balance, currency })

  return (
    <Link to="/app/$group-id" params={{ 'group-id': id }} aria-label={name}>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="font-semibold leading-none tracking-tight">{name}</div>
          <div className="text-sm text-muted-foreground">
            <span
              className={cn({
                'text-green-500': type === 'POSITIVE',
                'text-red-500': type === 'NEGATIVE'
              })}
            >
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
