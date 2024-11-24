import { randomUUID } from 'node:crypto'

export class IdValueObject {
  readonly #value: string

  private constructor(value?: string) {
    this.#value = value ?? randomUUID()
  }

  static create(value?: string): IdValueObject {
    return new IdValueObject(value)
  }

  get value(): string {
    return this.#value
  }
}
