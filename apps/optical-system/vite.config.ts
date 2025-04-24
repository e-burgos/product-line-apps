/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../libs/shell/src/utils/generateViteConfigBase';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.VITE_APP_OPTICAL_PORT || '4203');
  return generateViteConfigBase(
    'optical-system',
    env.VITE_APP_OPTICAL_APP_NAME || 'Optica Gestión',
    port,
    env
  );
});
