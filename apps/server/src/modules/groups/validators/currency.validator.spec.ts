import { currencyValidator } from './currency.validator'

describe('currencyValidator', () => {
  it.each([
    ['USD', true],
    ['EUR', true],
    ['BRL', true],
    ['invalid', false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    const result = currencyValidator.safeParse(data)
    expect(result.success).toBe(expected)
  })
})
