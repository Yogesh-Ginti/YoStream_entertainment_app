import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/' :{
        target : "https://yo-stream-entertainment-app.vercel.app"
      }
    }
  },
  plugins: [react()],
})
