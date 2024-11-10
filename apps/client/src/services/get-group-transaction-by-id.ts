import type { GetGroupTransactionByIdOutputDto } from 'contracts'

import { api } from '@/lib/api'

export async function getGroupTransactionById(
  groupId: string,
  transactionId: string
): Promise<GetGroupTransactionByIdOutputDto> {
  return api
    .get<{
      data: GetGroupTransactionByIdOutputDto
    }>(`/groups/${groupId}/transactions/${transactionId}`)
    .then(res => res.data.data)
}
