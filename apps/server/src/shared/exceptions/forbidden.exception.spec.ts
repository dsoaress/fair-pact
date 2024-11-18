import { ForbiddenException } from './forbidden.exception'

describe('ForbiddenException', () => {
  it('should create an instance of ForbiddenException', () => {
    const exception = new ForbiddenException('You are not allowed to delete this group')
    expect(exception).toBeInstanceOf(Error)
    expect(exception.name).toBe('ForbiddenException')
  })

  it('should have the correct message', () => {
    const exception = new ForbiddenException('You are not allowed to delete this group')
    expect(exception.message).toBe('You are not allowed to delete this group')
  })
})
