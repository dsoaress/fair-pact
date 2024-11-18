import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { getGroupTransactionByIdInputValidator } from './get-group-transaction-by-id-input.validator'

describe('getGroupTransactionByIdInputValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, userId: IdValueObject.create().value }, true],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupTransactionByIdInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
