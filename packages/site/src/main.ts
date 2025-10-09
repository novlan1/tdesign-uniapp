import { createSSRApp } from 'vue';
import App from './App.vue';
import DemoBlock from './components/demo-block/index.vue';
import DemoHeader from './components/demo-header/index.vue';
import TNavbar from 'tdesign-uniapp/navbar/navbar.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.component('t-demo', DemoBlock);
  app.component('t-demo-header', DemoHeader);
  app.component('t-navbar', TNavbar);
  return {
    app,
  };
}
