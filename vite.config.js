import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: 'all',
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: 'all',
  },
  plugins: [react()]
})
