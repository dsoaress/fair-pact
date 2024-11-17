import type { IdValueObject } from 'contracts'

import type { Model } from '@/shared/base/model'

export interface SessionModel extends Omit<Model, 'createdBy'> {
  userId: IdValueObject
  expiresAt: Date
}
