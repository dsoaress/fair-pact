import { IdValueObject } from '@/core/value-objects/id.value-object'
import { getGroupTransactionsByGroupIdInputValidator } from './get-group-transactions-by-group-id-input.validator'

describe('getGroupTransactionsByGroupIdInputValidator', () => {
  it.each([
    [
      {
        groupId: IdValueObject.create().value,
        memberId: IdValueObject.create().value,
        order: 'date',
        dir: 'desc',
        page: '1',
        'per-page': '10'
      },
      true
    ],
    [{ memberId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupTransactionsByGroupIdInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
