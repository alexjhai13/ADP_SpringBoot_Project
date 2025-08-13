import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: ['adp-customer-dashboard-react-project.onrender.com', '.onrender.com', 'localhost']
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['adp-customer-dashboard-react-project.onrender.com', '.onrender.com', 'localhost']
  },
  plugins: [react()]
})