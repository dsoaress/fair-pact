import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from '../../vitest.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.ts'],
      environmentMatchGlobs: [
        ['**/?(*.){int-spec,e2e-spec}.?(c|m)[jt]s?(x)', './vitest.environment.ts']
      ]
    }
  })
)
