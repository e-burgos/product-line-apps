/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/datatable',
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
      'libs/shell/src': path.resolve(__dirname, '../shell/src'),
      'libs/integrations/src': path.resolve(__dirname, '../integrations/src'),
    },
  },
  // build: {
  //   outDir: '../../dist/libs/datatable',
  //   emptyOutDir: true,
  //   reportCompressedSize: true,
  //   commonjsOptions: {
  //     transformMixedEsModules: true,
  //   },
  //   lib: {
  //     entry: 'src/index.ts',
  //     name: 'datatable',
  //     fileName: 'index',
  //     formats: ['es', 'cjs'],
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom', 'react/jsx-runtime'],
  //   },
  // },
});
