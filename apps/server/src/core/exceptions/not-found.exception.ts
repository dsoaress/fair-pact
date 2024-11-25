export class NotFoundException extends Error {
  constructor(resource: string) {
    super(`${resource} not found`)
    this.name = this.constructor.name
  }
}
