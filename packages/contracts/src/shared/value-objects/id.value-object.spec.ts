import { randomUUID } from 'node:crypto'

import { IdValueObject } from './id.value-object'

describe('IdValueObject', () => {
  it('should create a new id', () => {
    const id = IdValueObject.create()
    expect(id.value).toBeDefined()
  })

  it('should create a new id with a given value', () => {
    const input = randomUUID()
    const id = IdValueObject.create(input)
    expect(id.value).toBe(input)
  })
})
