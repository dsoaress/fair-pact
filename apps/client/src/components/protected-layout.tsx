import { useIsAuthenticated } from '@/hooks/use-auth'
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { Nav } from './nav'

export function ProtectedLayout(): JSX.Element {
  const isAuthenticated = useIsAuthenticated()
  const { location } = useRouterState()
  const navigate = useNavigate()
  const isSignInPage = location.pathname === '/sign-in'

  useLayoutEffect(() => {
    if (!isAuthenticated && !isSignInPage) navigate({ to: '/sign-in' })
    if (isAuthenticated && isSignInPage) navigate({ to: '/' })
  }, [isAuthenticated, navigate, isSignInPage])

  return (
    <div className="h-screen overflow-x-hidden pb-24">
      <div className="p-4 relative">
        <Outlet />
      </div>
      {isAuthenticated && <Nav />}
    </div>
  )
}
