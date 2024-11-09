import type { ZodError } from 'zod'

export class BadRequestException extends Error {
  constructor(error: string | ZodError) {
    super(typeof error === 'string' ? error : JSON.stringify(error.flatten().fieldErrors))
    this.name = this.constructor.name
  }
}
