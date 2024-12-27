import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/tango/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});
