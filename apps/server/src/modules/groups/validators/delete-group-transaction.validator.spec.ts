import { IdValueObject } from '@/core/value-objects/id.value-object'
import { deleteGroupTransactionValidator } from './delete-group-transaction.validator'

describe('deleteGroupTransactionValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value }, true],
    [{ id: 'invalid-id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = deleteGroupTransactionValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
