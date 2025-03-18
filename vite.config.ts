import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      assets: './assets',
      app: './src/app',
      config: './src/core/config',
      core: './src/core',
      pages: './src/features/pages',
      auth: './src/features/auth',
      wallet: './src/features/wallet',
      student: './src/features/student',
      features: './src/features',
      shared: './src/shared',
      store: './src/store',
      src: './src'
    }
  },
  build: {
    outDir: './build'
  },
  server: {
    port: 2999
  }
});
