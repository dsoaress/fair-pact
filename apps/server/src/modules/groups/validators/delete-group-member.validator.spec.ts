import { describe, expect, it } from 'vitest'

import { IdValueObject } from '@/shared/value-objects/id.value-object'

import { deleteGroupMemberValidator } from './delete-group-member.validator'

describe('DeleteGroupSchema', () => {
  it.each([
    [{ id: IdValueObject.create().value }, true],
    [{ id: 'invalid-id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = deleteGroupMemberValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
