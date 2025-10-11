import path from 'path';
// import chokidar from 'chokidar';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

const isH5 = process.env.UNI_PLATFORM === 'h5';

const baseAlias = {
  'tdesign-site': path.resolve(__dirname),
  'tdesign-uniapp': isH5
    ? path.resolve(__dirname, '../tdesign')
    : path.resolve(__dirname, './src/_tdesign'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      ...baseAlias,
    },
  },
  base: process.env.VITE_DEMO_BASE || 'tdesign-uniapp',
  server: {
    port: 11111,
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
});
