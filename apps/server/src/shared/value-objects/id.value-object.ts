import { createId, isCuid } from '@paralleldrive/cuid2'

import type { ValueObject } from '../base/value-object'
import { BadRequestException } from '../exceptions/bad-request.exception'

export class IdValueObject implements ValueObject<string> {
  private readonly _value: string

  private constructor(value?: string) {
    this._value = value || createId()
    this.validate()
  }

  static create(value?: string): IdValueObject {
    return new IdValueObject(value)
  }

  get value(): string {
    return this._value
  }

  private validate(): void {
    if (!isCuid(this._value)) throw new BadRequestException(`Invalid id: ${this._value}`)
  }
}
