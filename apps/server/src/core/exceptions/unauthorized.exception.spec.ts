import { UnauthorizedException } from './unauthorized.exception'

describe('Unauthorized', () => {
  it('should create an instance of Unauthorized', () => {
    const exception = new UnauthorizedException()
    expect(exception).toBeInstanceOf(Error)
    expect(exception.name).toBe('UnauthorizedException')
  })

  it('should have the correct message', () => {
    const exception = new UnauthorizedException()
    expect(exception.message).toBe('Unauthorized')
  })
})
