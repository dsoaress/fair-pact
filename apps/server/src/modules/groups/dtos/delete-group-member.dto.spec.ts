import { describe, expect, it } from 'vitest'

import { DeleteGroupSchema } from './delete-group.dto'

describe('DeleteGroupSchema', () => {
  it.each([
    [{ id: 'id', userId: 'id' }, true],
    [{ id: 'id' }, false],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = DeleteGroupSchema.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
