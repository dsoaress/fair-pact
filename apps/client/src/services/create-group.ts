import type { CreateGroupInputDTO, CreateGroupOutputDTO } from 'contracts'

import { api } from '@/lib/api'

export type CreateGroupProps = Omit<CreateGroupInputDTO, 'createdBy'>

export async function createGroup(data: CreateGroupProps): Promise<CreateGroupOutputDTO> {
  return api.post('/groups', data).then(res => res.data)
}
