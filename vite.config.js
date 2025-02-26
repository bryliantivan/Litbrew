import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows access from other devices on the network
    port: 5173,        // Port for your frontend
    proxy: {
      '/api': 'http://localhost:3000',  // Proxy API requests to backend
    }
  }
})
