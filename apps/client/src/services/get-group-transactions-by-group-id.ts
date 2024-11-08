import type { GetGroupTransactionsByGroupIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transactions-by-group-id-output.dto'

import { api } from '@/lib/api'

export async function getGroupTransactionsByGroupId(
  groupId: string
): Promise<GetGroupTransactionsByGroupIdOutputDto> {
  return api
    .get<{
      data: GetGroupTransactionsByGroupIdOutputDto
    }>(`/groups/${groupId}/transactions`)
    .then(res => res.data.data)
}
