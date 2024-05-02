import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        // Add any svgr options here
        icon: true,
      },
    }),
  ],
  server: {
    port: 3001, // Set your desired port number here
  },
});
