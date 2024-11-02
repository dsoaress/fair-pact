import type { GroupModel } from '@/modules/groups/models/group.model'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

export function groupFake(overrides?: Partial<GroupModel>): GroupModel {
  return {
    id: IdValueObject.create(),
    name: 'Group Name',
    members: [IdValueObject.create()],
    createdBy: IdValueObject.create(),
    createdAt: new Date(),
    ...overrides
  }
}
