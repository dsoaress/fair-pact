import type { GetGroupTransactionByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transaction-by-id-output.dto'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { api } from '@/lib/api'

import { keys } from './keys'

async function getGroupTransactionById(
  groupId: string,
  transactionId: string
): Promise<GetGroupTransactionByIdOutputDto> {
  return api
    .get<{
      data: GetGroupTransactionByIdOutputDto
    }>(`/groups/${groupId}/transactions/${transactionId}`)
    .then(res => res.data.data)
}

export function useGetGroupTransactionById(): UseQueryResult<
  GetGroupTransactionByIdOutputDto,
  Error
> {
  const { 'group-id': groupId, 'transaction-id': transactionId } = useParams({ strict: false })
  if (!groupId || !transactionId) throw new Error('Group ID and Transaction ID params are required')
  return useQuery({
    queryKey: [keys.GROUPS, keys.GROUP_TRANSACTIONS, groupId, transactionId],
    queryFn: (): Promise<GetGroupTransactionByIdOutputDto> =>
      getGroupTransactionById(groupId, transactionId),
    initialData: null
  })
}
