import path from 'path';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';


const baseAlias = {
  'tdesign-site': path.resolve(__dirname),
  'tdesign-uniapp-raw': path.resolve(__dirname, './src/_tdesign-raw'),
  'tdesign-uniapp': path.resolve(__dirname, './src/_tdesign'),
};

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
