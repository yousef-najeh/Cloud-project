import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure correct base path for Amplify
  build: {
    assetsInclude: ['aws-exports.js'], // Include aws-exports.js in build
  },
});