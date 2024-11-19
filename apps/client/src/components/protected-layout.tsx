import { useIsAuthenticated } from '@/hooks/use-auth'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { Nav } from './nav'

export function ProtectedLayout(): JSX.Element {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isAuthenticated) navigate({ to: '/' })
    else navigate({ to: '/sign-in' })
  }, [isAuthenticated, navigate])

  return (
    <div className="h-screen overflow-x-hidden pb-24">
      <div className="p-4 relative">
        <Outlet />
      </div>
      {isAuthenticated && <Nav />}
    </div>
  )
}
