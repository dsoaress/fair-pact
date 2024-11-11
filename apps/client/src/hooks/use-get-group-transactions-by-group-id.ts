import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import type { GetGroupTransactionsByGroupIdOutputDTO } from 'contracts'

import { queryKeys } from '@/constants/query-keys'
import { getGroupTransactionsByGroupId } from '@/services/get-group-transactions-by-group-id'

export function useGetGroupTransactionsByGroupId(): UseQueryResult<GetGroupTransactionsByGroupIdOutputDTO> {
  const { 'group-id': groupId } = useParams({ strict: false })
  if (!groupId) throw new Error('Group ID param is required')
  return useQuery({
    queryKey: [queryKeys.GROUPS, queryKeys.GROUP_TRANSACTIONS, groupId],
    queryFn: (): Promise<GetGroupTransactionsByGroupIdOutputDTO> =>
      getGroupTransactionsByGroupId(groupId),
    initialData: null
  })
}
