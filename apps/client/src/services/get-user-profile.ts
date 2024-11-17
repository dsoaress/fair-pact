import type { GetUserProfileOutputDTO } from 'contracts'

import { api } from '@/lib/api'

export async function getUserProfile(): Promise<GetUserProfileOutputDTO> {
  return api.get<{ data: GetUserProfileOutputDTO }>('/users/profile').then(res => res.data.data)
}
