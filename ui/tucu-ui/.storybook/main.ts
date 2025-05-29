import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.@(mdx)'],
  staticDirs: ['../src/assets'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
  async viteFinal(config) {
    const modulePath = process.cwd();
    const rootPath = modulePath.split('/ui')[0];

    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
      optimizeDeps: {
        include: [
          'lodash',
          '@tanstack/react-query',
          'vite-plugin-node-polyfills/shims/buffer',
          'vite-plugin-node-polyfills/shims/global',
          'vite-plugin-node-polyfills/shims/process',
          '@tanstack/react-query-devtools',
          'react-router-dom',
          'lucide-react',
          'react-hook-form',
          'react-input-mask',
          'react-dropzone',
          'swiper/modules',
          'swiper/react',
          'framer-motion',
        ],
      },
      build: {
        sourcemap: true,
        reportCompressedSize: true,
        chunkSizeWarningLimit: 10000,
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
    });
  },
};
export default config;
