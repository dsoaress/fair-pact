import { describe, expect, it } from 'vitest'

import { DeleteGroupMemberSchema } from './delete-group-member.dto'

describe('DeleteGroupMemberSchema', () => {
  it.each([
    [{ groupId: 'id', userId: 'id' }, true],
    [{ groupId: 'id' }, false],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = DeleteGroupMemberSchema.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
