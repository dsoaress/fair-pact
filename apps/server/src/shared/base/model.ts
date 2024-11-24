import type { IdValueObject } from '../value-objects/id.value-object'

export interface Model {
  id: IdValueObject
  createdBy: IdValueObject
  createdAt: Date
  updatedBy?: IdValueObject
  updatedAt?: Date
}
