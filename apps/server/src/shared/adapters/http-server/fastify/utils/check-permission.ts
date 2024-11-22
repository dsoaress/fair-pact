import type { FastifyRequest } from 'fastify'

import type { Permission } from '@/shared/base/http-server'
import { UnauthorizedException } from '@/shared/exceptions/unauthorized.exception'

export async function checkPermission(
  permission: Permission,
  request: FastifyRequest
): Promise<void> {
  if (permission === 'PRIVATE') {
    try {
      await request.jwtVerify()
    } catch {
      throw new UnauthorizedException()
    }
  }
}
