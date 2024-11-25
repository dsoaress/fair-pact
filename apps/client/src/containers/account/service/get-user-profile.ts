import type { GetUserProfileOutputDTO } from '~/get-user-profile-output.dto'

import { api } from '@/lib/api'

export async function getUserProfile(): Promise<GetUserProfileOutputDTO> {
  return api.get<{ data: GetUserProfileOutputDTO }>('/users/profile').then(res => res.data.data)
}
