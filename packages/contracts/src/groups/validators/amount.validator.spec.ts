import { amountValidator } from './amount.validator'

describe('amountValidator', () => {
  it.each([
    [{ amount: -100, participants: [{ amount: -50 }, { amount: -50 }] }, true],
    [{ amount: 100 }, true],
    [{ participants: [{ amount: -50 }] }, true],
    [{}, true],
    [{ amount: -100, participants: [{ amount: -50 }] }, false],
    [{ amount: -100, participants: [{}] }, false]
  ])('should validate the schema: %o (valid: %j)', (data, expected) => {
    expect(amountValidator(data as never)).toBe(expected)
  })
})
