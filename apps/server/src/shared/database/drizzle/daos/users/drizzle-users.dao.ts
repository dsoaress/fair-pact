import type { GetUserProfileOutputDTO } from 'contracts'
import { eq } from 'drizzle-orm'

import type { UsersDAO } from '@/modules/users/daos/users.dao'
import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import { users } from '@/shared/database/drizzle/schemas'

export class DrizzleUsersDAO implements UsersDAO {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getUserById(id: string): Promise<GetUserProfileOutputDTO | null> {
    const result = await this.drizzleService.query.users.findFirst({
      where: eq(users.id, id)
    })
    if (!result) return null
    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      avatar: result.avatar ?? null
    }
  }
}
