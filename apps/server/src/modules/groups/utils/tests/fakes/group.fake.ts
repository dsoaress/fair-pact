import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupModel } from '@/modules/groups/models/group.model'

export function groupFake(overrides?: Partial<GroupModel>): GroupModel {
  return {
    id: IdValueObject.create(),
    name: 'Group Name',
    currency: 'USD',
    members: [IdValueObject.create()],
    createdBy: IdValueObject.create(),
    createdAt: new Date(),
    ...overrides
  }
}
