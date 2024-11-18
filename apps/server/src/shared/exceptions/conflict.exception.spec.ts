import { ConflictException } from './conflict.exception'

describe('ConflictException', () => {
  it('should create an instance of ConflictException', () => {
    const exception = new ConflictException('Resource')
    expect(exception).toBeInstanceOf(Error)
    expect(exception.name).toBe('ConflictException')
  })

  it('should have the correct message', () => {
    const exception = new ConflictException('Resource')
    expect(exception.message).toBe('Resource already exists')
  })
})
