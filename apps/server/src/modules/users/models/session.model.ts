import type { Model } from '@/core/base/model'
import type { IdValueObject } from '@/core/value-objects/id.value-object'

export interface SessionModel extends Omit<Model, 'createdBy'> {
  userId: IdValueObject
  expiresAt: Date
}
