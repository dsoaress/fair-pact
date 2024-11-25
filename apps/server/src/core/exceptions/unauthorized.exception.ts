export class UnauthorizedException extends Error {
  constructor() {
    super('Unauthorized')
    this.name = this.constructor.name
  }
}
