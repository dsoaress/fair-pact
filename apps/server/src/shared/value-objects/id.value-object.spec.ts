import { createId } from '@paralleldrive/cuid2'
import { describe, expect, it } from 'vitest'

import { IdValueObject } from './id.value-object'

describe('IdValueObject', () => {
  it('should create a new id', () => {
    const id = IdValueObject.create()
    expect(id.value).toBeDefined()
  })

  it('should create a new id with a given value', () => {
    const input = createId()
    const id = IdValueObject.create(input)
    expect(id.value).toBe(input)
  })

  it('should throw an error for an invalid id', () => {
    expect(() => IdValueObject.create('invalid-id')).toThrow('Invalid id: invalid')
  })
})
