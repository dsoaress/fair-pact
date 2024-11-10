/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as AppIndexImport } from './routes/app/index'
import { Route as AppGroupIdIndexImport } from './routes/app/$group-id/index'
import { Route as AppGroupIdTransactionIdImport } from './routes/app/$group-id/$transaction-id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/app/',
  path: '/app/',
  getParentRoute: () => rootRoute,
} as any)

const AppGroupIdIndexRoute = AppGroupIdIndexImport.update({
  id: '/app/$group-id/',
  path: '/app/$group-id/',
  getParentRoute: () => rootRoute,
} as any)

const AppGroupIdTransactionIdRoute = AppGroupIdTransactionIdImport.update({
  id: '/app/$group-id/$transaction-id',
  path: '/app/$group-id/$transaction-id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/app/': {
      id: '/app/'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/app/$group-id/$transaction-id': {
      id: '/app/$group-id/$transaction-id'
      path: '/app/$group-id/$transaction-id'
      fullPath: '/app/$group-id/$transaction-id'
      preLoaderRoute: typeof AppGroupIdTransactionIdImport
      parentRoute: typeof rootRoute
    }
    '/app/$group-id/': {
      id: '/app/$group-id/'
      path: '/app/$group-id'
      fullPath: '/app/$group-id'
      preLoaderRoute: typeof AppGroupIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof AppIndexRoute
  '/login': typeof LoginIndexRoute
  '/app/$group-id/$transaction-id': typeof AppGroupIdTransactionIdRoute
  '/app/$group-id': typeof AppGroupIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/app': typeof AppIndexRoute
  '/login': typeof LoginIndexRoute
  '/app/$group-id/$transaction-id': typeof AppGroupIdTransactionIdRoute
  '/app/$group-id': typeof AppGroupIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/app/': typeof AppIndexRoute
  '/login/': typeof LoginIndexRoute
  '/app/$group-id/$transaction-id': typeof AppGroupIdTransactionIdRoute
  '/app/$group-id/': typeof AppGroupIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/app'
    | '/login'
    | '/app/$group-id/$transaction-id'
    | '/app/$group-id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/app'
    | '/login'
    | '/app/$group-id/$transaction-id'
    | '/app/$group-id'
  id:
    | '__root__'
    | '/'
    | '/app/'
    | '/login/'
    | '/app/$group-id/$transaction-id'
    | '/app/$group-id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppIndexRoute: typeof AppIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
  AppGroupIdTransactionIdRoute: typeof AppGroupIdTransactionIdRoute
  AppGroupIdIndexRoute: typeof AppGroupIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppIndexRoute: AppIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
  AppGroupIdTransactionIdRoute: AppGroupIdTransactionIdRoute,
  AppGroupIdIndexRoute: AppGroupIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/app/",
        "/login/",
        "/app/$group-id/$transaction-id",
        "/app/$group-id/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/app/": {
      "filePath": "app/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/app/$group-id/$transaction-id": {
      "filePath": "app/$group-id/$transaction-id.tsx"
    },
    "/app/$group-id/": {
      "filePath": "app/$group-id/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
