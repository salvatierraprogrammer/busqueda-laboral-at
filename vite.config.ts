// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // O '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@component': '/src/component',
      '@layout': '/src/layout',
      '@auth': '/src/auth',
      '@config': '/src/config'
    }
  }
});