import { createGroupValidator } from './create-group.validator'

describe('createGroupValidator', () => {
  it.each([
    [{ name: 'Group 1', currency: 'USD', createdBy: 'id' }, true],
    [{ name: 'a'.repeat(2), createdBy: 'id' }, false],
    [{ name: 'a'.repeat(256), createdBy: 'id' }, false],
    [{ name: 1, createdBy: 'id' }, false],
    [{ name: undefined, createdBy: 'id' }, false],
    [{ name: null, createdBy: 'id' }, false],
    [{ name: true, createdBy: 'id' }, false],
    [{ name: 'Group 1', createdBy: undefined }, false],
    [{ name: 'Group 1', createdBy: null }, false],
    [{ name: 'Group 1', createdBy: true }, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = createGroupValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
