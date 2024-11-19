import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { getGroupTransactionsByGroupIdInputValidator } from './get-group-transactions-by-group-id-input.validator'

describe('getGroupTransactionsByGroupIdInputValidator', () => {
  it.each([
    [{ groupId: IdValueObject.create().value, memberId: IdValueObject.create().value }, true],
    [{ memberId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupTransactionsByGroupIdInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
