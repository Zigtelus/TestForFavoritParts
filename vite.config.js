import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hs/hsprice': {
        target: 'http://api.favorit-parts.ru',
        changeOrigin: true,
      },
    },
  },
});