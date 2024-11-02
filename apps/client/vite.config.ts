import path from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const isTest = process.env.NODE_ENV === 'test'

export default defineConfig({
  plugins: [
    !isTest && TanStackRouterVite({ generatedRouteTree: './src/route-tree.gen.ts' }),
    TanStackRouterVite({}),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
