import { eq } from 'drizzle-orm'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { DrizzleService } from '@/infra/database/drizzle/drizzle.service'
import { sessions } from '@/infra/database/drizzle/schemas'
import type { SessionModel } from '@/modules/users/models/session.model'
import type { SessionsRepository } from '@/modules/users/repositories/sessions.repository'

type SessionResult = {
  id: string
  userId: string
  createdAt: Date
  expiresAt: Date
}

export class DrizzleSessionsRepository implements SessionsRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: string): Promise<SessionModel | null> {
    const result = await this.drizzleService.query.sessions.findFirst({
      where: eq(sessions.id, id)
    })
    if (!result) return null
    return this.mapToModel(result)
  }

  async create(model: SessionModel): Promise<{ id: string }> {
    const result = await this.drizzleService
      .insert(sessions)
      .values({
        id: model.id.value,
        userId: model.userId.value,
        createdAt: model.createdAt,
        expiresAt: model.expiresAt
      })
      .returning({ id: sessions.id })

    return { id: result[0].id }
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService.delete(sessions).where(eq(sessions.id, id))
  }

  private mapToModel(result: SessionResult): SessionModel {
    return {
      id: IdValueObject.create(result.id),
      userId: IdValueObject.create(result.userId),
      createdAt: result.createdAt,
      expiresAt: result.expiresAt
    }
  }
}
