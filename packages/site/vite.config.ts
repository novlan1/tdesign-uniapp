import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  base: process.env.VITE_DEMO_BASE || 'tdesign-uniapp',
  server: {
    port: 11111,
    hmr: true,
  },
});
