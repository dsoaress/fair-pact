import { eq } from 'drizzle-orm'

import type { CacheService } from '@/core/base/cache-service'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { users } from '@/infra/database/drizzle/schemas'
import type { UsersDAO } from '@/modules/users/daos/users.dao'
import type { GetUserProfileOutputDTO } from '@/modules/users/dtos/get-user-profile-output.dto'

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
