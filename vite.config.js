import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Movies-Project/', // اسم الريبو بين سلاشات
})
