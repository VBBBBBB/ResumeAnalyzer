import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['13.206.82.96.nip.io', 'localhost'],
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/analyze': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
    },
  },
})
