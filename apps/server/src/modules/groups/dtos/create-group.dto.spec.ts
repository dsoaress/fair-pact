import { describe, expect, it } from 'vitest'

import { CreateGroupSchema } from './create-group.dto'

describe('CreateGroupSchema', () => {
  it.each([
    [{ name: 'Group 1', createdBy: 'id' }, true],
    [{ name: 'a'.repeat(2), createdBy: 'id' }, false],
    [{ name: 'a'.repeat(256), createdBy: 'id' }, false],
    [{ name: 1, createdBy: 'id' }, false],
    [{ name: undefined, createdBy: 'id' }, false],
    [{ name: null, createdBy: 'id' }, false],
    [{ name: true, createdBy: 'id' }, false],
    [{ name: 'Group 1', createdBy: undefined }, false],
    [{ name: 'Group 1', createdBy: null }, false],
    [{ name: 'Group 1', createdBy: true }, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = CreateGroupSchema.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
