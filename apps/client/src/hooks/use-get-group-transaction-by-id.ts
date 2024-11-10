import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import type { GetGroupTransactionByIdOutputDto } from 'contracts'

import { queryKeys } from '@/constants/query-keys'
import { getGroupTransactionById } from '@/services/get-group-transaction-by-id'

export function useGetGroupTransactionById(): UseQueryResult<GetGroupTransactionByIdOutputDto> {
  const { 'group-id': groupId, 'transaction-id': transactionId } = useParams({ strict: false })
  if (!groupId || !transactionId) throw new Error('Group ID and Transaction ID params are required')
  return useQuery({
    queryKey: [queryKeys.GROUPS, queryKeys.GROUP_TRANSACTIONS, groupId, transactionId],
    queryFn: (): Promise<GetGroupTransactionByIdOutputDto> =>
      getGroupTransactionById(groupId, transactionId),
    initialData: null
  })
}
