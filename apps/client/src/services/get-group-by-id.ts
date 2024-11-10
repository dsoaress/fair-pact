import type { GetGroupByIdOutputDto } from 'contracts'

import { api } from '@/lib/api'

export async function getGroupById(groupId: string): Promise<GetGroupByIdOutputDto> {
  return api.get<{ data: GetGroupByIdOutputDto }>(`/groups/${groupId}`).then(res => res.data.data)
}
