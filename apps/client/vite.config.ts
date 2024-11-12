import path from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'

const isTest = process.env.NODE_ENV === 'test'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/app',
  includeAssets: ['favicon.svg'],

  manifest: {
    name: 'Fair Pact',
    short_name: 'Fair Pact',
    theme_color: '#16A34A',
    display: 'standalone'
  },
  devOptions: {
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html'
  }
}

export default defineConfig({
  plugins: [
    !isTest && TanStackRouterVite({ generatedRouteTree: './src/route-tree.gen.ts' }),
    react(),
    VitePWA(pwaOptions)
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
