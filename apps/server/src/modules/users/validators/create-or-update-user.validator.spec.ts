import { createOrUpdateUserValidator } from './create-or-update-user.validator'

describe('createOrUpdateUserValidator', () => {
  it.each([
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        avatar: 'https://example.com/john.png'
      },
      true
    ],
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com'
      },
      true
    ],
    [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe'
      },
      false
    ],
    [
      {
        firstName: 'John',
        lastName: 'Doe'
      },
      false
    ],
    [
      {
        firstName: 'a'.repeat(256),
        lastName: 'a'.repeat(256)
      },
      false
    ]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = createOrUpdateUserValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
