import { IdValueObject } from '@/core/value-objects/id.value-object'
import { removeGroupMemberValidator } from './remove-group-member.validator'

describe('removeGroupMemberValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, memberId: IdValueObject.create().value }, true],
    [{ memberId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = removeGroupMemberValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
