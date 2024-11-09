import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      enabled: true,
      include: ['apps/client/src', 'apps/server/src', 'packages/contracts/src'],
      exclude: ['**/route-tree.gen.ts', '**/*.int.spec.ts', '**/*.e2e.spec.ts']
    }
  }
})
