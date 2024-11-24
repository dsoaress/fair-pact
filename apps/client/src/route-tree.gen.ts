/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './app/__root'
import { Route as IndexImport } from './app/index'
import { Route as TransactionIndexImport } from './app/transaction/index'
import { Route as SignInIndexImport } from './app/sign-in/index'
import { Route as FriendsIndexImport } from './app/friends/index'
import { Route as ActivitiesIndexImport } from './app/activities/index'
import { Route as AccountIndexImport } from './app/account/index'
import { Route as GroupIdIndexImport } from './app/$group-id/index'
import { Route as GroupIdTransactionIdIndexImport } from './app/$group-id/$transaction-id/index'
import { Route as GroupIdTransactionIdEditImport } from './app/$group-id/$transaction-id/edit'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TransactionIndexRoute = TransactionIndexImport.update({
  id: '/transaction/',
  path: '/transaction/',
  getParentRoute: () => rootRoute,
} as any)

const SignInIndexRoute = SignInIndexImport.update({
  id: '/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any)

const FriendsIndexRoute = FriendsIndexImport.update({
  id: '/friends/',
  path: '/friends/',
  getParentRoute: () => rootRoute,
} as any)

const ActivitiesIndexRoute = ActivitiesIndexImport.update({
  id: '/activities/',
  path: '/activities/',
  getParentRoute: () => rootRoute,
} as any)

const AccountIndexRoute = AccountIndexImport.update({
  id: '/account/',
  path: '/account/',
  getParentRoute: () => rootRoute,
} as any)

const GroupIdIndexRoute = GroupIdIndexImport.update({
  id: '/$group-id/',
  path: '/$group-id/',
  getParentRoute: () => rootRoute,
} as any)

const GroupIdTransactionIdIndexRoute = GroupIdTransactionIdIndexImport.update({
  id: '/$group-id/$transaction-id/',
  path: '/$group-id/$transaction-id/',
  getParentRoute: () => rootRoute,
} as any)

const GroupIdTransactionIdEditRoute = GroupIdTransactionIdEditImport.update({
  id: '/$group-id/$transaction-id/edit',
  path: '/$group-id/$transaction-id/edit',
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
    '/$group-id/': {
      id: '/$group-id/'
      path: '/$group-id'
      fullPath: '/$group-id'
      preLoaderRoute: typeof GroupIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/account/': {
      id: '/account/'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountIndexImport
      parentRoute: typeof rootRoute
    }
    '/activities/': {
      id: '/activities/'
      path: '/activities'
      fullPath: '/activities'
      preLoaderRoute: typeof ActivitiesIndexImport
      parentRoute: typeof rootRoute
    }
    '/friends/': {
      id: '/friends/'
      path: '/friends'
      fullPath: '/friends'
      preLoaderRoute: typeof FriendsIndexImport
      parentRoute: typeof rootRoute
    }
    '/sign-in/': {
      id: '/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInIndexImport
      parentRoute: typeof rootRoute
    }
    '/transaction/': {
      id: '/transaction/'
      path: '/transaction'
      fullPath: '/transaction'
      preLoaderRoute: typeof TransactionIndexImport
      parentRoute: typeof rootRoute
    }
    '/$group-id/$transaction-id/edit': {
      id: '/$group-id/$transaction-id/edit'
      path: '/$group-id/$transaction-id/edit'
      fullPath: '/$group-id/$transaction-id/edit'
      preLoaderRoute: typeof GroupIdTransactionIdEditImport
      parentRoute: typeof rootRoute
    }
    '/$group-id/$transaction-id/': {
      id: '/$group-id/$transaction-id/'
      path: '/$group-id/$transaction-id'
      fullPath: '/$group-id/$transaction-id'
      preLoaderRoute: typeof GroupIdTransactionIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$group-id': typeof GroupIdIndexRoute
  '/account': typeof AccountIndexRoute
  '/activities': typeof ActivitiesIndexRoute
  '/friends': typeof FriendsIndexRoute
  '/sign-in': typeof SignInIndexRoute
  '/transaction': typeof TransactionIndexRoute
  '/$group-id/$transaction-id/edit': typeof GroupIdTransactionIdEditRoute
  '/$group-id/$transaction-id': typeof GroupIdTransactionIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$group-id': typeof GroupIdIndexRoute
  '/account': typeof AccountIndexRoute
  '/activities': typeof ActivitiesIndexRoute
  '/friends': typeof FriendsIndexRoute
  '/sign-in': typeof SignInIndexRoute
  '/transaction': typeof TransactionIndexRoute
  '/$group-id/$transaction-id/edit': typeof GroupIdTransactionIdEditRoute
  '/$group-id/$transaction-id': typeof GroupIdTransactionIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$group-id/': typeof GroupIdIndexRoute
  '/account/': typeof AccountIndexRoute
  '/activities/': typeof ActivitiesIndexRoute
  '/friends/': typeof FriendsIndexRoute
  '/sign-in/': typeof SignInIndexRoute
  '/transaction/': typeof TransactionIndexRoute
  '/$group-id/$transaction-id/edit': typeof GroupIdTransactionIdEditRoute
  '/$group-id/$transaction-id/': typeof GroupIdTransactionIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/$group-id'
    | '/account'
    | '/activities'
    | '/friends'
    | '/sign-in'
    | '/transaction'
    | '/$group-id/$transaction-id/edit'
    | '/$group-id/$transaction-id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/$group-id'
    | '/account'
    | '/activities'
    | '/friends'
    | '/sign-in'
    | '/transaction'
    | '/$group-id/$transaction-id/edit'
    | '/$group-id/$transaction-id'
  id:
    | '__root__'
    | '/'
    | '/$group-id/'
    | '/account/'
    | '/activities/'
    | '/friends/'
    | '/sign-in/'
    | '/transaction/'
    | '/$group-id/$transaction-id/edit'
    | '/$group-id/$transaction-id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  GroupIdIndexRoute: typeof GroupIdIndexRoute
  AccountIndexRoute: typeof AccountIndexRoute
  ActivitiesIndexRoute: typeof ActivitiesIndexRoute
  FriendsIndexRoute: typeof FriendsIndexRoute
  SignInIndexRoute: typeof SignInIndexRoute
  TransactionIndexRoute: typeof TransactionIndexRoute
  GroupIdTransactionIdEditRoute: typeof GroupIdTransactionIdEditRoute
  GroupIdTransactionIdIndexRoute: typeof GroupIdTransactionIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GroupIdIndexRoute: GroupIdIndexRoute,
  AccountIndexRoute: AccountIndexRoute,
  ActivitiesIndexRoute: ActivitiesIndexRoute,
  FriendsIndexRoute: FriendsIndexRoute,
  SignInIndexRoute: SignInIndexRoute,
  TransactionIndexRoute: TransactionIndexRoute,
  GroupIdTransactionIdEditRoute: GroupIdTransactionIdEditRoute,
  GroupIdTransactionIdIndexRoute: GroupIdTransactionIdIndexRoute,
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
        "/$group-id/",
        "/account/",
        "/activities/",
        "/friends/",
        "/sign-in/",
        "/transaction/",
        "/$group-id/$transaction-id/edit",
        "/$group-id/$transaction-id/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$group-id/": {
      "filePath": "$group-id/index.tsx"
    },
    "/account/": {
      "filePath": "account/index.tsx"
    },
    "/activities/": {
      "filePath": "activities/index.tsx"
    },
    "/friends/": {
      "filePath": "friends/index.tsx"
    },
    "/sign-in/": {
      "filePath": "sign-in/index.tsx"
    },
    "/transaction/": {
      "filePath": "transaction/index.tsx"
    },
    "/$group-id/$transaction-id/edit": {
      "filePath": "$group-id/$transaction-id/edit.tsx"
    },
    "/$group-id/$transaction-id/": {
      "filePath": "$group-id/$transaction-id/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
