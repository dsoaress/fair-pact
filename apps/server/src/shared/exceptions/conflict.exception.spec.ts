import { describe, expect, it } from 'vitest'

import { ConflicException } from './conflict.exception'

describe('ConflicException', () => {
  it('should create an instance of ConflicException', () => {
    const exception = new ConflicException('Resource')
    expect(exception).toBeInstanceOf(Error)
    expect(exception.name).toBe('ConflicException')
  })

  it('should have the correct message', () => {
    const exception = new ConflicException('Resource')
    expect(exception.message).toBe('Resource already exists')
  })
})
