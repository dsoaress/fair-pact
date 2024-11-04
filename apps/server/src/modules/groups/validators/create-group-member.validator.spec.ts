import { describe, expect, it } from 'vitest'

import { IdValueObject } from '@/shared/value-objects/id.value-object'
import { createGroupMemberValidator } from './create-group-member.validator'

describe('createGroupMemberValidator', () => {
  it.each([
    [{ groupId: IdValueObject.create().value, userId: IdValueObject.create().value }, true],
    [{ groupId: 'id' }, false],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = createGroupMemberValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
