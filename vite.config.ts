import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

// SPA fallback: all routes serve index.html (used by vite-plugin-vercel in .vercel/output)
export default defineConfig({
  plugins: [react(), vercel()],
  // @ts-expect-error - vite-plugin-vercel extends config; emits rewrites into .vercel/output
  vercel: {
    rewrites: [{ source: '/(.*)', destination: '/index.html' }]
  },
  server: {
    port: process.env.PORT as unknown as number,
    allowedHosts: true // allow ngrok and other tunnel hosts
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
