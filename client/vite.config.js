import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Configure your proxy rules here
      '/api': { // Matches requests starting with '/api'
        target: 'https://yo-stream-entertainment-app.vercel.app', // Replace with your backend API URL
        changeOrigin: true, // Change the origin header to match the target server
      },
    },
  },
  plugins: [react()],
})
