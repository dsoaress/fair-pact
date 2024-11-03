import type { Model } from '@/shared/base/model'
import type { IdValueObject } from '@/shared/value-objects/id.value-object'

export interface GroupMemberModel extends Pick<Model, 'createdAt'> {
  groupId: IdValueObject
  userId: IdValueObject
  balance: number
}
