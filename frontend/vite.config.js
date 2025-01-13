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


  // for local
  // plugins: [react()],
  // server: {
  //   port: 3000, // Dev server port
  //   proxy: {
  //     // Proxy API requests to the backend server
  //     '/auth/v1': {
  //       target: 'http://localhost:8000', // Backend server URL
  //       changeOrigin: true, // Needed for virtual hosted sites
  //       rewrite: (path) => path.replace(/^\/auth\/v1/, '/auth/v1'),
  //     },
  //   },
  // },
})
