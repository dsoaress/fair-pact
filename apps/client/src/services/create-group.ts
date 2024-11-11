import type { CreateGroupDTO } from 'contracts'

import { api } from '@/lib/api'

export type CreateGroupProps = Omit<CreateGroupDTO, 'createdBy'>

export async function createGroup(data: CreateGroupProps): Promise<void> {
  await api.post('/groups', data)
}
