import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { getGroupsInputValidator } from './get-groups-input.validator'

describe('getGroupsInputValidator', () => {
  it.each([
    [{ userId: IdValueObject.create().value }, true],
    [{ userId: 'invalid-id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupsInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
