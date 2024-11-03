import { describe, expect, it } from 'vitest'

import { CreateGroupMemberSchema } from './create-group-member.dto'

describe('CreateGroupMemberSchema', () => {
  it.each([
    [{ groupId: 'id', userId: 'id' }, true],
    [{ groupId: 'id' }, false],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = CreateGroupMemberSchema.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
