/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../libs/shell/src/utils/generateViteConfigBase';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_PRODUCT_MANAGER_PORT || '4200');

  return generateViteConfigBase(
    'product-manager',
    'Product Manager',
    port,
    env
  );
});
