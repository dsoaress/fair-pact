import { describe, expect, it } from 'vitest'

import { NotFoundException } from './not-found.exception'

describe('NotFoundException', () => {
  it('should create an instance of NotFoundException', () => {
    const exception = new NotFoundException('Resource')
    expect(exception).toBeInstanceOf(Error)
  })

  it('should have the correct message', () => {
    const exception = new NotFoundException('Resource')
    expect(exception.message).toBe('Resource not found')
  })
})
