import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { deleteGroupMemberValidator } from './delete-group-member.validator'

describe('deleteGroupMemberValidator', () => {
  it.each([
    [{ groupId: IdValueObject.create().value, userId: IdValueObject.create().value }, true],
    [{ groupId: 'invalid-id', userId: 'invalid-id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = deleteGroupMemberValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
