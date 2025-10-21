import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';


const baseAlias = {
  'tdesign-site': path.resolve(__dirname).replace(/\\/g, '/'),
  packages: path.resolve(__dirname, '../').replace(/\\/g, '/'),
  'tdesign-uniapp-raw': path.resolve(__dirname, './src/_tdesign-raw').replace(/\\/g, '/'),
  'tdesign-uniapp': path.resolve(__dirname, './src/_tdesign').replace(/\\/g, '/'),
};
const ENV_PREFIX = ['VITE_', 'VUE_APP'];
const root: string = process.cwd();


export default ({ mode }) => {
  const env = loadEnv(mode, root, ENV_PREFIX);
  const vueAppBase = env.VUE_APP_PUBLICPATH;

  const result = defineConfig({
    plugins: [
      uni(),
    ],
    resolve: {
      alias: {
        ...baseAlias,
      },
    },
    base: vueAppBase || '/tdesign-uniapp/mobile',
    server: {
      port: 11111,
      hmr: true,
      watch: {
        usePolling: true,
      },
    },
  });

  return result;
};
