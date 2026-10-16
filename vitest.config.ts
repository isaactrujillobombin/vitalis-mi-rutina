import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Playwright tiene su propia carpeta: que Vitest no intente ejecutarla.
    exclude: ['node_modules', 'dist', 'tests/e2e/**'],
  },
});
