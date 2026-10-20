import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url'; // 🔥 Добавляем для безопасного вычисления путей
import path from 'path';             // 🔥 ОБЯЗАТЕЛЬНО ИМПОРТИРУЕМ PATH

// Безопасный аналог __dirname для современных ESM-модулей в Vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Теперь путь разрешится железно и без ошибок
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/hs/hsprice': {
        target: 'http://api.favorit-parts.ru',
        changeOrigin: true,
      },
    },
  },
});