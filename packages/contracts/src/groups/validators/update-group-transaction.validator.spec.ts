import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'
import { updateGroupTransactionValidator } from './update-group-transaction.validator'

describe('createGroupTransactionValidator', () => {
  it.each([
    [
      {
        id: IdValueObject.create().value,
        name: 'Transaction',
        amount: -100,
        groupId: IdValueObject.create().value,
        payerUserId: IdValueObject.create().value,
        userId: IdValueObject.create().value,
        participants: [
          { userId: IdValueObject.create().value, amount: -50 },
          { userId: IdValueObject.create().value, amount: -50 }
        ],
        date: new Date()
      },
      true
    ],
    [
      {
        id: IdValueObject.create().value,
        groupId: IdValueObject.create().value,
        userId: IdValueObject.create().value
      },
      true
    ],
    [
      {
        id: 'invalid-id',
        groupId: 'invalid-id',
        userId: 'invalid-id'
      },
      false
    ]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = updateGroupTransactionValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
