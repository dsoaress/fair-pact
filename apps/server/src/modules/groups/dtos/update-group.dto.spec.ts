import { describe, expect, it } from 'vitest'

import { UpdateGroupSchema } from './update-group.dto'

describe('UpdateGroupSchema', () => {
  it.each([
    [{ id: 'id', name: 'Group 1', updatedBy: 'id' }, true],
    [{ id: 'id', updatedBy: 'id' }, true],
    [{ id: 'id', name: true, updatedBy: 'id' }, false],
    [{ id: 'id' }, false],
    [{ id: 'id', updatedBy: true }, false],
    [{ id: 'id' }, false],
    [{ updatedBy: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = UpdateGroupSchema.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
