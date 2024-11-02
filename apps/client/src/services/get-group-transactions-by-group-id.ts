import type { GetGroupTransactionsByGroupIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-output.dto'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { api } from '@/lib/api'

import { keys } from './keys'

async function getGroupTransactionsByGroupId(
  groupId: string
): Promise<GetGroupTransactionsByGroupIdOutputDto> {
  return api
    .get<{
      data: GetGroupTransactionsByGroupIdOutputDto
    }>(`/groups/${groupId}/transactions`)
    .then(res => res.data.data)
}

export function useGetGroupTransactionsByGroupId(): UseQueryResult<
  GetGroupTransactionsByGroupIdOutputDto,
  Error
> {
  const { 'group-id': groupId } = useParams({ strict: false })
  if (!groupId) throw new Error('Group ID param is required')
  return useQuery({
    queryKey: [keys.GROUPS, keys.GROUP_TRANSACTIONS, groupId],
    queryFn: (): Promise<GetGroupTransactionsByGroupIdOutputDto> =>
      getGroupTransactionsByGroupId(groupId),
    initialData: null
  })
}
