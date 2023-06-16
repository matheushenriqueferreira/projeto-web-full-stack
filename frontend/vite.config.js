import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: {
    cert: fs.readFileSync('SSL/code.crt'),
    key: fs.readFileSync('SSL/code.key')
  }},
  plugins: [react()],
})
