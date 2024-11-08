import type { GetGroupTransactionsByGroupIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-output.dto'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { queryKeys } from '@/constants/query-keys'
import { getGroupTransactionsByGroupId } from '@/services/get-group-transactions-by-group-id'

export function useGetGroupTransactionsByGroupId(): UseQueryResult<GetGroupTransactionsByGroupIdOutputDto> {
  const { 'group-id': groupId } = useParams({ strict: false })
  if (!groupId) throw new Error('Group ID param is required')
  return useQuery({
    queryKey: [queryKeys.GROUPS, queryKeys.GROUP_TRANSACTIONS, groupId],
    queryFn: (): Promise<GetGroupTransactionsByGroupIdOutputDto> =>
      getGroupTransactionsByGroupId(groupId),
    initialData: null
  })
}
