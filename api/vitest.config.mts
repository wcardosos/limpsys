import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ['./tests/**/*.spec.ts'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
