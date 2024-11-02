export class BadRequestException extends Error {
  constructor(message: string | string[]) {
    super(Array.isArray(message) ? message.join(', ') : message)
    this.name = this.constructor.name
  }
}
