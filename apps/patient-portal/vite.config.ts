import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@healthify/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/src'),
      '@healthify/db': path.resolve(__dirname, '../../packages/db/src'),
      '@healthify/fhir-server': path.resolve(__dirname, '../../packages/fhir-server/src'),
    },
  },
  define: {
    'process.env': {},
    'process.browser': true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
}); 