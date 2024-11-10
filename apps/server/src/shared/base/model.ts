import type { IdValueObject } from 'contracts'

export interface Model {
  id: IdValueObject
  createdBy: IdValueObject
  createdAt: Date
  updatedBy?: IdValueObject
  updatedAt?: Date
}
