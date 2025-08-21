/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import basicSsl from '@vitejs/plugin-basic-ssl';


export default defineConfig({
  plugins: [react(), tsconfigPaths(), basicSsl()],
  server: {
    https: true,
    // ДОБАВЛЯЕМ ПРОКСИ
    proxy: {
      // Все запросы, начинающиеся с /api
      '/api': {
        // будут перенаправлены на наш локальный бэкенд
        target: 'http://localhost:5001',
        // Важно для корректной работы
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});