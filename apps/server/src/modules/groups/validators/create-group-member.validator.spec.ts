import { describe, expect, it } from 'vitest'

import { createGroupMemberValidator } from './create-group-member.validator'

describe('createGroupMemberValidator', () => {
  it.each([
    [{ groupId: 'id', userId: 'id' }, true],
    [{ groupId: 'id' }, false],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = createGroupMemberValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
