import { updateGroupValidator } from './update-group.validator'

describe('updateGroupValidator', () => {
  it.each([
    [{ id: 'id', name: 'Group 1', currency: 'USD', updatedBy: 'id' }, true],
    [{ id: 'id', updatedBy: 'id' }, true],
    [{ id: 'id', name: true, updatedBy: 'id' }, false],
    [{ id: 'id' }, false],
    [{ id: 'id', updatedBy: true }, false],
    [{ id: 'id' }, false],
    [{ updatedBy: 'id' }, false],
    [{}, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = updateGroupValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
