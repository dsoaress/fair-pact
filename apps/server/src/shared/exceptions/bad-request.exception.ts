import { ZodError } from 'zod'

export class BadRequestException extends Error {
  constructor(error: string | ZodError) {
    super(error instanceof ZodError ? JSON.stringify(error.flatten().fieldErrors) : error)
    this.name = this.constructor.name
  }
}
