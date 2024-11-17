import { Outlet, useNavigate } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'

import { useIsAuthenticated } from '@/hooks/use-auth'

export function PublicLayout(): JSX.Element {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isAuthenticated) navigate({ to: '/app' })
  }, [isAuthenticated, navigate])

  return (
    <div className="h-screen">
      <Outlet />
    </div>
  )
}
