import type { Command } from '@/core/base/command'
import { ForbiddenException } from '@/core/exceptions/forbidden.exception'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { SessionsRepository } from '../repositories/sessions.repository'

export class RefreshSessionCommand
  implements Command<string, Promise<{ userId: string; sessionId: string }>>
{
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async execute(sessionId: string): Promise<{ userId: string; sessionId: string }> {
    const session = await this.sessionsRepository.findById(sessionId)
    if (!session) throw new ForbiddenException('Session expired')
    const idValidPeriod = session.expiresAt.getTime() >= Date.now()
    if (!idValidPeriod) throw new ForbiddenException('Session expired')
    await this.sessionsRepository.delete(sessionId)
    const { id } = await this.sessionsRepository.create({
      id: IdValueObject.create(),
      userId: IdValueObject.create(session.userId.value),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15) // 15 days
    })
    return { userId: session.userId.value, sessionId: id }
  }
}
