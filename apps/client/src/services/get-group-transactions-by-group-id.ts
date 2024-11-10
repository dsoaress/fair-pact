import type { GetGroupTransactionsByGroupIdOutputDto } from 'contracts'

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
