import type { Repository } from '@/core/base/repository'

import type { SessionModel } from '../models/session.model'

export interface SessionsRepository extends Omit<Repository<SessionModel>, 'create'> {
  findById(id: string): Promise<SessionModel | null>
  create(model: SessionModel): Promise<{ id: string }>
  delete(id: string): Promise<void>
}
