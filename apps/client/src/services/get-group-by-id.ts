import type { GetGroupByIdOutputDto } from '@fair-pact/contracts/groups/dtos/get-group-by-id-output.dto'

import { api } from '@/lib/api'

export async function getGroupById(groupId: string): Promise<GetGroupByIdOutputDto> {
  return api.get<{ data: GetGroupByIdOutputDto }>(`/groups/${groupId}`).then(res => res.data.data)
}
