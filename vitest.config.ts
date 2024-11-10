import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ['apps/client/src', 'apps/server/src', 'packages/contracts/src'],
      exclude: [
        '**/route-tree.gen.ts',
        '**/?(*.){spec,int-spec,e2e-spec}.?(c|m)[jt]s?(x)',
        'packages/contracts/src/index.ts'
      ]
    }
  }
})
