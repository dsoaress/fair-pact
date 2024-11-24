import { getRouteApi } from '@tanstack/react-router'
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useDebounce } from '@/hooks/use-debounce'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumn?: string
  filterPlaceholder?: string
}

const routeApi = getRouteApi('/$group-id/')

export function TransactionsTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder
}: Readonly<DataTableProps<TData, TValue>>): JSX.Element {
  const { search } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()
  const [tempSearch, setTempSearch] = useState<string | undefined>(search)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true
  })

  const debouncedSearch = useDebounce(tempSearch)

  useEffect(() => {
    navigate({
      search: (prev): typeof navigate.arguments => ({
        ...prev,
        search: debouncedSearch ?? undefined
      })
    })
  }, [debouncedSearch, navigate])

  return (
    <div>
      {!!filterColumn && (
        <div className="flex items-center py-4">
          <Input
            placeholder={filterPlaceholder}
            className="max-w-sm"
            value={tempSearch ?? ''}
            onChange={(e): void => setTempSearch(e.target.value)}
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
