/// <reference types='vitest' />
import path from 'path';
import process from 'process';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export function generateViteConfigBaseComplete(
  name: string,
  siteName: string,
  port: number,
  env: Record<string, string> = {}
): UserConfig {
  const modulePath = process.cwd();
  const isProduction = env.NODE_ENV === 'production';
  const rootPath = modulePath.split('/apps')[0];

  return {
    root: modulePath,
    cacheDir: `../../node_modules/.vite/apps/${name}`,

    server: {
      port,
      host: 'localhost',
    },

    preview: {
      port,
      host: 'localhost',
    },

    plugins: [
      react(),
      nodePolyfills(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace('%SITE_NAME%', `${siteName}`);
        },
      },
    ],

    resolve: {
      alias: {
        'libs/ui/src': path.resolve(modulePath, '../../libs/ui/src'),
        'libs/shell/src': path.resolve(modulePath, '../../libs/shell/src'),
        'libs/integrations/src': path.resolve(
          modulePath,
          '../../libs/integrations/src/'
        ),
        'libs/datatable/src': path.resolve(
          modulePath,
          '../../libs/datatable/src'
        ),
        'libs/features/src': path.resolve(
          modulePath,
          '../../libs/features/src'
        ),
        'libs/dexie/src': path.resolve(modulePath, '../../libs/dexie/src'),
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

    // build: {
    //   outDir: `../../dist/apps/${name}`,
    //   emptyOutDir: true,
    //   reportCompressedSize: true,
    //   chunkSizeWarningLimit: 10000,
    //   commonjsOptions: {
    //     transformMixedEsModules: true,
    //   },
    //   //minify: isProduction,
    // },

    build: {
      sourcemap: true,
      outDir: `../../dist/apps/${name}`,
      emptyOutDir: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 10000,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      minify: isProduction,
      rollupOptions: {
        input: {
          main: path.resolve(modulePath, 'index.html'),
        },
        output: {
          compact: true,
          manualChunks(filepath: string) {
            //if (filepath.includes('lodash')) return 'lodash';
            if (
              filepath.includes(`${rootPath}/ui/`) ||
              filepath.includes(`${rootPath}/libs/`) ||
              filepath.includes(`${rootPath}/apps/`)
            )
              return 'main';
            if (filepath.includes('node_modules')) return 'vendor';
            return 'polyfill';
          },
        },
      },
    },

    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: `../../coverage/apps/${name}`,
        provider: 'v8',
      },
    },

    assetsInclude: ['**/*.md'],
  };
}
