// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // O '@vitejs/plugin-react'
import path from 'path'; 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@component': path.resolve(__dirname, 'src/component'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@config': path.resolve(__dirname, 'src/config')
    }
  }
});
