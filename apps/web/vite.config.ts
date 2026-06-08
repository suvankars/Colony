import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@repo/ui': path.resolve(__dirname, '../../packages/ui')
    }
  },
  server: {
    fs: {
      // allow serving files from the monorepo packages directory
      allow: [path.resolve(__dirname, '../../packages'), path.resolve(__dirname)]
    }
  },
  optimizeDeps: {
    // don't pre-bundle the local package so HMR works on source files
    exclude: ['@repo/ui']
  }
});
