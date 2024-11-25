import { IdValueObject } from '@/core/value-objects/id.value-object'
import { getGroupTransactionByIdInputValidator } from './get-group-transaction-by-id-input.validator'

describe('getGroupTransactionByIdInputValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, memberId: IdValueObject.create().value }, true],
    [{ memberId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupTransactionByIdInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
