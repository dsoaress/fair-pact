import { IdValueObject } from '../value-objects/id.value-object'

import { idValidator } from './id.validator'

describe('idValidator', () => {
  it.each([
    [IdValueObject.create().value, true],
    ['id', false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = idValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
