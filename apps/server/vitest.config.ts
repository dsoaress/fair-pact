import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    hookTimeout: 1000 * 10, // 10 seconds
    testTimeout: 1000 * 10, // 10 seconds
    include: ['**/?(*.){spec,int-spec,e2e-spec}.?(c|m)[jt]s?(x)'],
    environmentMatchGlobs: [
      ['**/?(*.){int-spec,e2e-spec}.?(c|m)[jt]s?(x)', './vitest.environment.ts']
    ]
  }
})
