import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: ConfigEnv) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  // Configure Vite
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_REACT_APP_API_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
