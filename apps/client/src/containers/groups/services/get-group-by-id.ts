import type { GetGroupByIdOutputDTO } from '~/get-group-by-id-output.dto'

import { api } from '@/lib/api'

export async function getGroupById(groupId: string): Promise<GetGroupByIdOutputDTO> {
  return api.get(`/groups/${groupId}`).then(res => res.data.data)
}
