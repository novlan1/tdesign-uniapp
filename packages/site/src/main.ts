import { createSSRApp } from 'vue';
import App from './App.vue';
import DemoBlock from './components/demo-block/index.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.component('t-demo', DemoBlock);
  return {
    app,
  };
}
