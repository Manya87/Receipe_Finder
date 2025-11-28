import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: update 'spark_project' to your actual repo name
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/spark_project/' : '/',
})
