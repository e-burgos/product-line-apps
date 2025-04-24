import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

/**
 * @see https://vitejs.dev/config/
 */

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite/apps/agro-swap',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    reactRefresh(),
    nodePolyfills(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],

  resolve: {
    alias: {
      '@': path.resolve('./src'),
      ui: path.resolve('../../libs/ui/src/index.ts'),
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
    include: [
      'tailwindcss',
      '@headlessui/react',
      '@tailwindcss/forms',
      '@tailwindcss/typography',
    ],
  },

  build: {
    outDir: '../../dist/apps/agro-swap',
    emptyOutDir: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 10000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
