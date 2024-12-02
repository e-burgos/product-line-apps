/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../libs/shell/src/utils/generateViteConfigBase';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_OPTICAL_SYSTEM_PORT || '4203');

  return generateViteConfigBase('optical-system', 'Siochana Visión', port, env);
});
