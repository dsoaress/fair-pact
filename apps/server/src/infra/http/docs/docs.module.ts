import * as fs from 'node:fs'
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

import { groupsDocs } from './groups.docs'
import { sessionsDocs } from './sessions.docs'
import { usersDocs } from './users.docs'

function docsModule(): void {
  const registry = new OpenAPIRegistry()

  groupsDocs(registry)
  usersDocs(registry)
  sessionsDocs(registry)

  const docs = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'api',
      version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:3000' }]
  })

  fs.writeFileSync(
    `${import.meta.dirname}/../../../../../../openapi-docs.json`,
    JSON.stringify(docs, null, 2),
    { encoding: 'utf-8' }
  )
}

docsModule()
