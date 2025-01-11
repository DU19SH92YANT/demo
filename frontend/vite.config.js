import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';


// https://vite.dev/config/
export default defineConfig({
   base: '/',
  plugins: [react(),visualizer()],
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1000, // Set the limit to 1 MB or any value you prefer
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split React libraries
          // Split Lodash or any other large library
        },
      },
    },
  },
})
