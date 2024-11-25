import { eq } from 'drizzle-orm'

import type { UsersDAO } from '@/modules/users/daos/users.dao'
import type { GetUserProfileOutputDTO } from '@/modules/users/dtos/get-user-profile-output.dto'
import type { CacheService } from '@/shared/base/cache-service'
import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import { users } from '@/shared/database/drizzle/schemas'

export class DrizzleUsersDAO implements UsersDAO {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly cacheService: CacheService
  ) {}

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
