import { z } from 'zod'
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

  it('should be able to receive an ZodError', () => {
    const schema = z.object({ id: z.string().uuid() })
    const parsedData = schema.safeParse({ id: 'invalid' })
    let exception: BadRequestException | undefined = undefined
    if (!parsedData.success) exception = new BadRequestException(parsedData.error)
    expect(exception?.message).toBeDefined()
  })
})
