import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { getGroupByIdInputValidator } from './get-group-by-id-input.validator'

describe('getGroupByIdInputValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value, userId: IdValueObject.create().value }, true],
    [{ userId: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = getGroupByIdInputValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
