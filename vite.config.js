import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base must match your GitHub repo name exactly, e.g.
// if your repo is github.com/you/feelings-jars, base stays '/feelings-jars/'.
// If you rename the repo, update this to match.
export default defineConfig({
  plugins: [react()],
  base: '/feelings-jars/',
})
