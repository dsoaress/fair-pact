import { IdValueObject } from '@/core/value-objects/id.value-object'
import { joinGroupValidator } from './join-group.validator'

describe('joinGroupValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, memberId: IdValueObject.create().value }, true],
    [{ memberId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = joinGroupValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
