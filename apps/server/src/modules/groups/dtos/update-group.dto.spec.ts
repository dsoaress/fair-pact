import { describe, expect, it } from 'vitest'

import { UpdateGroupSchema } from './update-group.dto'

describe('UpdateGroupSchema', () => {
  it('should create a valid schema', () => {
    const schema1 = UpdateGroupSchema.safeParse({
      name: 'Group 1',
      members: ['1', '2']
    })
    const schema2 = UpdateGroupSchema.safeParse({
      name: 'Group 1'
    })
    const schema3 = UpdateGroupSchema.safeParse({
      members: ['1', '2']
    })
    const schema4 = UpdateGroupSchema.safeParse({})
    expect(schema1.success).toBe(true)
    expect(schema2.success).toBe(true)
    expect(schema3.success).toBe(true)
    expect(schema4.success).toBe(true)
  })
})
