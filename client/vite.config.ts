/// <reference types="vitest" />
import { defineConfig } from 'vite';
import type { Plugin, Connect } from 'vite'; // 1. Импортируем Connect
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import basicSsl from '@vitejs/plugin-basic-ssl';

function spaFallback(): Plugin {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      return () => {
        // 2. Явно указываем типы для аргументов middleware
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          // Теперь TypeScript знает, что у req есть свойство .url
          if (req.url && !req.url.includes('.') && !req.url.startsWith('/@')) {
            req.url = '/index.html';
          }
          next();
        });
      };
    },
  };
}

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