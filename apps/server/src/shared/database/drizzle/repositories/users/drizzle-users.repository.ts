import { IdValueObject } from 'contracts'
import { eq } from 'drizzle-orm'

import type { UserModel } from '@/modules/users/models/user.model'
import type { UsersRepository } from '@/modules/users/repositories/users.repository'
import type { DrizzleService } from '@/shared/database/drizzle/drizzle.service'
import { users } from '@/shared/database/drizzle/schemas'

type UserResult = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  createdAt: Date
}

export class DrizzleUsersRepository implements UsersRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

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
