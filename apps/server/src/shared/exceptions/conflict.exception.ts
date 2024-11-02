export class ConflicException extends Error {
  constructor(resource: string) {
    super(`${resource} already exists`)
    this.name = this.constructor.name
  }
}
