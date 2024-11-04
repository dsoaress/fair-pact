import type { Model } from '@/shared/base/model'
import type { IdValueObject } from '@/shared/value-objects/id.value-object'

export interface GroupMemberModel extends Omit<Model, 'createdBy'> {
  groupId: IdValueObject
  userId: IdValueObject
  balance: number
}
