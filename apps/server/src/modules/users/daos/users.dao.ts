import type { GetUserProfileOutputDTO } from '../dtos/get-user-profile-output.dto'

export interface UsersDAO {
  getUserById(id: string): Promise<GetUserProfileOutputDTO | null>
}
