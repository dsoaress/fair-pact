import type { GetUserProfileOutputDto } from 'contracts'
import { eq } from 'drizzle-orm'

import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import { users } from '@/shared/database/drizzle/schemas'

export class UsersDao {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getUserById(id: string): Promise<GetUserProfileOutputDto | null> {
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
