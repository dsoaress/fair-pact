import { createId } from '@paralleldrive/cuid2'

import type { ValueObject } from '../base/value-object'

export class IdValueObject implements ValueObject<string> {
  readonly #value: string

  private constructor(value?: string) {
    this.#value = value || createId()
  }

  static create(value?: string): IdValueObject {
    return new IdValueObject(value)
  }

  get value(): string {
    return this.#value
  }
}
