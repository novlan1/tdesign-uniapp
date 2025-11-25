import App from './App';
// eslint-disable-next-line import/no-unresolved
import Vue from 'vue';
import './style/app.less';
import './uni.promisify.adaptor';
import DemoBaseMixin from './mixins/demo-base.js';


Vue.config.productionTip = false;
App.mpType = 'app';
Vue.mixin(DemoBaseMixin);
const app = new Vue({
  ...App,
});

app.$mount();

