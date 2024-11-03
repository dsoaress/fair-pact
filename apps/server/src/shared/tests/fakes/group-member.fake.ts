import type { GroupMemberModel } from '@/modules/groups/models/group-member.model'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

export function groupMemberFake(overrides?: Partial<GroupMemberModel>): GroupMemberModel {
  return {
    groupId: IdValueObject.create(),
    userId: IdValueObject.create(),
    balance: 10,
    createdAt: new Date(),
    ...overrides
  }
}
