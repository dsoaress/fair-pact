export class ConflictException extends Error {
  constructor(resource: string) {
    super(`${resource} already exists`)
    this.name = this.constructor.name
  }
}
