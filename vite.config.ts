import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'build', // Ensure this matches your Netlify publish directory
    sourcemap: true, // Enable source maps for easier debugging
    assetsDir: 'assets', // Ensure assets are placed in the assets directory
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000, // Optional: specify the development server port
    open: true, // Optional: automatically open the browser on start
  },
});
