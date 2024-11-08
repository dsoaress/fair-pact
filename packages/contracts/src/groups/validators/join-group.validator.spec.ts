import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { joinGroupValidator } from './join-group.validator'

describe('joinGroupValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, userId: IdValueObject.create().value }, true],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = joinGroupValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
