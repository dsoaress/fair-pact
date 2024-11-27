import type { FastifyRequest } from 'fastify'

import { type Permission, permissions } from '@/core/base/http-server'
import { UnauthorizedException } from '@/core/exceptions/unauthorized.exception'

export async function checkPermission(
  permission: Permission,
  request: FastifyRequest
): Promise<void> {
  if (permission === permissions.PRIVATE) {
    try {
      await request.jwtVerify()
    } catch {
      throw new UnauthorizedException()
    }
  }
}
