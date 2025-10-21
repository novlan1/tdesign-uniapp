import { createSSRApp } from 'vue';
import App from './App.vue';
import './style/app.less';

export function createApp() {
  const app = createSSRApp(App);

  app.mixin({
    computed: {
      isH5() {
        let result = false;
        // #ifdef H5
        result = true;
        // #endif
        return result;
      },
      isMP() {
        let result = false;
        // #ifdef MP
        result = true;
        // #endif
        return result;
      },
    },
  });
  return {
    app,
  };
}
