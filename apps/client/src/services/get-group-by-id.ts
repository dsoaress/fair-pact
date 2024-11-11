import type { GetGroupByIdOutputDTO } from 'contracts'

import { api } from '@/lib/api'

export async function getGroupById(groupId: string): Promise<GetGroupByIdOutputDTO> {
  return api.get<{ data: GetGroupByIdOutputDTO }>(`/groups/${groupId}`).then(res => res.data.data)
}
