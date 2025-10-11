import { createSSRApp } from 'vue';
import App from './App.vue';
import DemoBlock from './components/demo-block/index.vue';
import DemoHeader from './components/demo-header/index.vue';
import TNavbar from 'tdesign-uniapp/navbar/navbar.vue';
import TButton from 'tdesign-uniapp/button/button.vue';
import './style/app.less';

export function createApp() {
  const app = createSSRApp(App);

  app.component('t-demo', DemoBlock);
  app.component('t-demo-header', DemoHeader);

  app.component('t-navbar', TNavbar);
  app.component('t-button', TButton);

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
