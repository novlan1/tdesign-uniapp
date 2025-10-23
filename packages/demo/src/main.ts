import { createSSRApp } from 'vue';
import App from './App.vue';
import './style/app.less';
import DemoBaseMixin from './mixins/demo-base.js';

export function createApp() {
  const app = createSSRApp(App);

  app.mixin(DemoBaseMixin);
  return {
    app,
  };
}
