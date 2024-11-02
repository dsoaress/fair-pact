import { describe, expect, it } from 'vitest'

import { CreateGroupSchema } from './create-group.dto'

describe('CreateGroupSchema', () => {
  it('should create a valid schema', () => {
    const schema = CreateGroupSchema.safeParse({
      name: 'Group 1',
      members: ['1', '2']
    })
    expect(schema.success).toBe(true)
  })

  it.each(['a'.repeat(2), 'a'.repeat(256), 1, undefined, null, true])(
    'should throw an error if name is invalid',
    name => {
      const schema = CreateGroupSchema.safeParse({ name, members: ['1', '2'] })
      expect(schema.success).toBe(false)
    }
  )

  it.each([[], [1], undefined, null])('should throw an error if members is invalid', members => {
    const schema = CreateGroupSchema.safeParse({ name: 'Group 1', members })
    expect(schema.success).toBe(false)
  })
})
