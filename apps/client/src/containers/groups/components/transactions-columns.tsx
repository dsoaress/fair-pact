import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

import type { GetGroupTransactionsByGroupIdOutputDTO } from '~/get-group-transactions-by-group-id-output.dto'

import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/format-date'
import { formatPrice } from '@/utils/format-price'

export const transactionsColumns: ColumnDef<GetGroupTransactionsByGroupIdOutputDTO[0]>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }): string => formatDate(row.original.date)
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }): JSX.Element => {
      const { id, name } = row.original
      return (
        <Link
          to="/$group-id/$transaction-id"
          from="/$group-id"
          params={{ 'transaction-id': id }}
          aria-label={name}
        >
          {name}
        </Link>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: 'Valor total',
    cell: ({ row }): string => {
      const { currency, amount } = row.original
      const { formattedPrice } = formatPrice({ currency, price: amount })
      return formattedPrice
    }
  },
  {
    accessorKey: 'payer',
    header: 'Quem pagou',
    cell: ({ row }): string => {
      const { payer } = row.original
      return `${payer.firstName} ${payer.lastName}`
    }
  },
  {
    accessorKey: 'contribution',
    header: 'Contribuição',
    cell: ({ row }): JSX.Element => {
      const { currency, contribution } = row.original
      const { formattedPrice, type } = formatPrice({ currency, price: contribution })
      return (
        <span
          className={cn({
            'text-green-500': type === 'POSITIVE',
            'text-red-500': type === 'NEGATIVE'
          })}
        >
          {formattedPrice}
        </span>
      )
    }
  }
]
