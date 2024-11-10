/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
}

// biome-ignore lint/correctness/noUnusedVariables: This is a false positive
interface ImportMeta {
  readonly env: ImportMetaEnv
}
