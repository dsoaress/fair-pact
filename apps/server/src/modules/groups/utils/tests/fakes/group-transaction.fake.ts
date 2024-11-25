import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { GroupTransactionModel } from '@/modules/groups/models/group-transaction.model'

export function groupTransactionFake(
  overrides?: Partial<GroupTransactionModel>
): GroupTransactionModel {
  const payerMemberId = IdValueObject.create()
  return {
    id: IdValueObject.create(),
    name: 'Group Transaction Name',
    amount: 100,
    groupId: IdValueObject.create(),
    payerMemberId,
    participants: [
      { memberId: payerMemberId, amount: -50 },
      { memberId: IdValueObject.create(), amount: -50 }
    ],
    date: new Date(),
    createdAt: new Date(),
    createdBy: IdValueObject.create(),
    ...overrides
  }
}
