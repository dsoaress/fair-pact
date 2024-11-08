import type { GetGroupTransactionByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-transaction-by-id-output.dto'

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
