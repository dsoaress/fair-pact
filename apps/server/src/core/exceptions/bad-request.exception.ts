import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

export class BadRequestException extends Error {
  constructor(error: string | ZodError) {
    super(
      error instanceof ZodError
        ? fromError(error, { prefix: null, issueSeparator: ' | ' }).toString()
        : error
    )
    this.name = this.constructor.name
  }
}
