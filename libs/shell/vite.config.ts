/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/shell',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  resolve: {
    alias: {
      'libs/ui/src': path.resolve(__dirname, '../ui/src'),
      'libs/integrations/src': path.resolve(__dirname, '../integrations/src'),
      'libs/datatable/src': path.resolve(__dirname, '../datatable/src'),
      'libs/features/src': path.resolve(__dirname, '../features/src'),
      'libs/dexie/src': path.resolve(__dirname, '../dexie/src'),
    },
  },
  // build: {
  //   outDir: '../../dist/libs/shell',
  //   emptyOutDir: true,
  //   reportCompressedSize: true,
  //   commonjsOptions: {
  //     transformMixedEsModules: true,
  //   },
  //   lib: {
  //     entry: 'src/index.ts',
  //     name: 'shell',
  //     fileName: 'index',
  //     formats: ['es', 'cjs'],
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom', 'react/jsx-runtime'],
  //   },
  // },
});
