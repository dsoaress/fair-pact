import { eq } from 'drizzle-orm'

import type { CacheService } from '@/core/base/cache-service'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { users } from '@/infra/database/drizzle/schemas'
import type { UserModel } from '@/modules/users/models/user.model'
import type { UsersRepository } from '@/modules/users/repositories/users.repository'

type UserResult = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  createdAt: Date
}

export class DrizzleUsersRepository implements UsersRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly cacheService: CacheService
  ) {}

  async findById(id: string): Promise<UserModel | null> {
    const result = await this.drizzleService.query.users.findFirst({
      where: eq(users.id, id)
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async createOrUpdate(model: UserModel): Promise<{ id: string }> {
    const result = await this.drizzleService
      .insert(users)
      .values({
        id: model.id.value,
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        avatar: model.avatar,
        createdAt: model.createdAt
      })
      .onConflictDoUpdate({
        target: [users.email],
        set: {
          firstName: model.firstName,
          lastName: model.lastName,
          avatar: model.avatar
        }
      })
      .returning({ id: users.id })

    return { id: result[0].id }
  }

  private mapToModel(result: UserResult): UserModel {
    return {
      id: IdValueObject.create(result.id),
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      avatar: result.avatar ?? undefined,
      createdAt: result.createdAt
    }
  }
}
