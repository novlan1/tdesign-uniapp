import { createSSRApp } from 'vue';
import App from './App.vue';
import DemoBlock from './components/demo-block/index.vue';
import DemoHeader from './components/demo-header/index.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.component('t-demo', DemoBlock);
  app.component('t-demo-header', DemoHeader);
  return {
    app,
  };
}
