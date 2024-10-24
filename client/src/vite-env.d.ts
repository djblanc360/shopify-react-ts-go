/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string; // requires `VITE_` prepended
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}