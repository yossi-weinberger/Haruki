import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true // allow ngrok and other tunnel hosts
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
