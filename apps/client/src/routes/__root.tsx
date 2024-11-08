import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import type { JSX } from 'react'

export const Route = createRootRoute({
  component: (): JSX.Element => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/app" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
})
