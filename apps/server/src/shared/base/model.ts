import type { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

export interface Model {
  id: IdValueObject
  createdBy: IdValueObject
  createdAt: Date
  updatedBy?: IdValueObject
  updatedAt?: Date
}
