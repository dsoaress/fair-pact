import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    hookTimeout: 1000 * 10, // 10 seconds
    testTimeout: 1000 * 10, // 10 seconds
    include: ['**/?(*.){spec,int-spec,e2e-spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      enabled: true,
      include: ['apps/client/src', 'apps/server/src', 'packages/contracts/src'],
      exclude: [
        '**/route-tree.gen.ts',
        '**/*.d.ts',
        '**/?(*.){spec,int-spec,e2e-spec}.?(c|m)[jt]s?(x)',
        'packages/contracts/src/index.ts'
      ],
      reporter: ['text', 'html', 'lcov']
    }
  }
})
