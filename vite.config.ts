import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base ('./') keeps every asset path subpath-safe so the built
// site works unchanged on GitHub Pages project URLs (username.github.io/repo/)
// as well as a custom domain.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
})
