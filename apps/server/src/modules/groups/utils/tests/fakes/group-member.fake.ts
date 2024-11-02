import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { GroupMemberModel } from '@/modules/groups/models/group-member.model'

export function groupMemberFake(overrides?: Partial<GroupMemberModel>): GroupMemberModel {
  return {
    groupId: IdValueObject.create(),
    userId: IdValueObject.create(),
    createdAt: new Date(),
    ...overrides
  }
}
