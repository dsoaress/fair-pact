import { IdValueObject } from '@/core/value-objects/id.value-object'
import { getGroupsInputValidator } from './get-groups-input.validator'

describe('getGroupsInputValidator', () => {
  it.each([
    [{ memberId: IdValueObject.create().value }, true],
    [{ memberId: 'invalid-id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupsInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
