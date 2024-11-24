import type { Model } from '@/shared/base/model'
import type { IdValueObject } from '@/shared/value-objects/id.value-object'

export interface SessionModel extends Omit<Model, 'createdBy'> {
  userId: IdValueObject
  expiresAt: Date
}
