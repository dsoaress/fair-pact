import type { GetGroupTransactionsByGroupIdOutputDTO } from 'contracts'

import { api } from '@/lib/api'

export async function getGroupTransactionsByGroupId(
  groupId: string
): Promise<GetGroupTransactionsByGroupIdOutputDTO> {
  return api
    .get<{
      data: GetGroupTransactionsByGroupIdOutputDTO
    }>(`/groups/${groupId}/transactions`)
    .then(res => res.data.data)
}
