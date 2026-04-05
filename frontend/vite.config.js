import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['13.206.82.96.nip.io', 'localhost'],
    proxy: {
      '/auth': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/analyze': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/rephrase': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/generate': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
    },
  },
})
