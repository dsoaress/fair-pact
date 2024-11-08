import type { GetGroupsOutputDto } from '@fair-pact/contracts/groups/dtos/get-groups-output.dto'

import { api } from '@/lib/api'

export async function getGroups(): Promise<GetGroupsOutputDto> {
  return api.get<{ data: GetGroupsOutputDto }>('/groups').then(res => res.data.data)
}
