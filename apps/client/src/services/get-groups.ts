import type { GetGroupsOutputDto } from 'contracts'

import { api } from '@/lib/api'

export async function getGroups(): Promise<GetGroupsOutputDto> {
  return api.get<{ data: GetGroupsOutputDto }>('/groups').then(res => res.data.data)
}
