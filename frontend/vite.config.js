import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';


// https://vite.dev/config/
export default defineConfig({
  base: '/', // Ensure this is correct for your deployment (default root path)
  plugins: [
    react(),
    visualizer(), // Visualizer plugin for analyzing bundle size
  ],
  build: {
    outDir: 'build', // Vercel expects the output directory to be specified
    chunkSizeWarningLimit: 1000, // Adjust warning limit for chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor libraries for optimization
          // Add any additional libraries to split
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
