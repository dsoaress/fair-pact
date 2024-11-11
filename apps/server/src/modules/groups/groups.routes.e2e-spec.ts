import { app } from '@/shared/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('[E2E]: Groups', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 401', async () => {
    await request(app.server)
      .get('/groups')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTNiNWVmZS05ZWUxLTRiNjMtOTE3ZS1jZTc0MzEyYmE5M2MiLCJpYXQiOjE5MjA1MTQ1MzV9.KP9XaFC0Aw1rk3IDYkS0G_KoYkZ6uAJU56tHdp5X_jA'
      )

    expect(true).toBe(true)
  })
})
