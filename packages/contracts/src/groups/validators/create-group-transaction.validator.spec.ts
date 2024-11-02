import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'
import { createGroupTransactionValidator } from './create-group-transaction.validator'

describe('createGroupTransactionValidator', () => {
  it.each([
    [
      {
        name: 'Transaction',
        amount: -100,
        groupId: IdValueObject.create().value,
        payerMemberId: IdValueObject.create().value,
        participants: [
          { memberId: IdValueObject.create().value, amount: -50 },
          { memberId: IdValueObject.create().value, amount: -50 }
        ],
        createdBy: IdValueObject.create().value
      },
      true
    ],
    [
      {
        name: 'Transaction',
        amount: 100,
        groupId: IdValueObject.create().value,
        payerMemberId: IdValueObject.create().value,
        createdBy: IdValueObject.create().value
      },
      false
    ],
    [
      {
        name: 'Transaction',
        amount: -100,
        groupId: IdValueObject.create().value,
        payerMemberId: IdValueObject.create().value,
        participants: [{ memberId: IdValueObject.create().value }],
        createdBy: IdValueObject.create().value
      },
      false
    ],
    [
      {
        name: 'Transaction',
        amount: -100,
        groupId: IdValueObject.create().value,
        payerMemberId: IdValueObject.create().value,
        participants: [{}],
        createdBy: IdValueObject.create().value
      },
      false
    ],
    [
      {
        name: 'Transaction',
        amount: 100,
        groupId: IdValueObject.create().value,
        payerMemberId: IdValueObject.create().value
      },
      false
    ],
    [{ name: 'Transaction', amount: 100, groupId: IdValueObject.create().value }, false],
    [{ name: 'Transaction', amount: 100 }, false],
    [{ name: 'Transaction' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = createGroupTransactionValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
