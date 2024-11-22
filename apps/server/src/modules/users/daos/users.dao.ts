import type { GetUserProfileOutputDTO } from 'contracts'

export interface UsersDAO {
  getUserById(id: string): Promise<GetUserProfileOutputDTO | null>
}
