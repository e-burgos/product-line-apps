/// <reference types='vitest' />
import path from 'path';
import process from 'process';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export function generateViteConfigBase(
  name: string,
  siteName: string,
  port: number,
  env: Record<string, string> = {}
): UserConfig {
  const modulePath = process.cwd();
  const isProduction = env.NODE_ENV === 'production';

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
      outDir: `../../dist/apps/${name}`,
      emptyOutDir: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 10000,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      //minify: isProduction,
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
