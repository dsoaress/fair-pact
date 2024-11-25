import { IdValueObject } from '@/core/value-objects/id.value-object'
import { getGroupByIdInputValidator } from './get-group-by-id-input.validator'

describe('getGroupByIdInputValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, memberId: IdValueObject.create().value }, true],
    [{ memberId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupByIdInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
