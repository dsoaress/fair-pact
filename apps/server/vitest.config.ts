import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    hookTimeout: 1000 * 60, // 1 minute
    testTimeout: 1000 * 60 // 1 minute
  }
})
