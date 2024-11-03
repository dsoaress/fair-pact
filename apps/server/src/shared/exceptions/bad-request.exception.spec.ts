import { describe, expect, it } from 'vitest'

import { BadRequestException } from './bad-request.exception'

describe('BadRequestException', () => {
  it('should create an instance of BadRequestException', () => {
    const exception = new BadRequestException('Invalid id')
    expect(exception).toBeInstanceOf(BadRequestException)
    expect(exception.name).toBe('BadRequestException')
  })

  it('should have a message', () => {
    const exception = new BadRequestException('Invalid id')
    expect(exception.message).toBe('Invalid id')
  })

  it('should have a message with multiple errors', () => {
    const exception = new BadRequestException(['Invalid id', 'Invalid name'])
    expect(exception.message).toBe('Invalid id, Invalid name')
  })
})
