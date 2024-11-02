import type { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { Model } from '@/shared/base/model'

export interface GroupMemberModel extends Omit<Model, 'id' | 'createdBy'> {
  groupId: IdValueObject
  userId: IdValueObject
}
