import { describe, expect, it } from 'vitest'

import { IdValueObject } from '../../shared/value-objects/id.value-object'

import { deleteGroupValidator } from './delete-group.validator'

describe('deleteGroupValidator', () => {
  it.each([
    [{ id: IdValueObject.create().value }, true],
    [{ id: 'invalid-id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = deleteGroupValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
