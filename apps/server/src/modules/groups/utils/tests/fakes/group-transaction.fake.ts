import { IdValueObject } from '@fair-pact/contracts/shared/value-objects/id.value-object'

import type { GroupTransactionModel } from '@/modules/groups/models/group-transaction.model'

export function groupTransactionFake(
  overrides?: Partial<GroupTransactionModel>
): GroupTransactionModel {
  const payerUserId = IdValueObject.create()
  return {
    id: IdValueObject.create(),
    name: 'Group Transaction Name',
    amount: 100,
    groupId: IdValueObject.create(),
    payerUserId,
    participants: [
      { userId: payerUserId, amount: -50 },
      { userId: IdValueObject.create(), amount: -50 }
    ],
    date: new Date(),
    createdAt: new Date(),
    createdBy: IdValueObject.create(),
    ...overrides
  }
}
