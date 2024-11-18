import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { removeGroupMemberValidator } from './remove-group-member.validator'

describe('removeGroupMemberValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, userId: IdValueObject.create().value }, true],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = removeGroupMemberValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
