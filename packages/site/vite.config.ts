import path from 'path';
// import chokidar from 'chokidar';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

const isH5 = process.env.UNI_PLATFORM === 'h5';

const baseAlias = {
  'tdesign-site': path.resolve(__dirname),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(),
    // {
    //   name: 'custom-watcher',
    //   configureServer(server) {
    //     chokidar.watch('../').on('change', (path) => {
    //       console.log('1111', path);
    //       server.ws.send({ type: 'full-reload' }); // 触发刷新
    //     });
    //   },
    // },
  ],
  resolve: {
    alias: isH5 ? {
      // 不使用 workspace，而使用 alias，解决修改组件后必须重启才能生效
      ...baseAlias,
      'tdesign-uniapp': path.resolve(__dirname, '../tdesign'),       // 根目录别名
    } : {
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
