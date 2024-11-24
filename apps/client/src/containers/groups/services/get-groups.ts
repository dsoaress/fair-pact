import type { GetGroupsOutputDTO } from 'contracts'

import { api } from '@/lib/api'

export async function getGroups(): Promise<GetGroupsOutputDTO> {
  return api.get<{ data: GetGroupsOutputDTO }>('/groups').then(res => res.data.data)
}
