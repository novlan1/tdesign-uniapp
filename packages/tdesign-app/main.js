/* eslint-disable import/no-unresolved */
import App from './App';
import store from './store';
import './style/app.less';


import {
  createSSRApp,
} from 'vue';
import * as Pinia from 'pinia';
import Vuex from 'vuex';

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(Pinia.createPinia());
  app.config.globalProperties.$adpid = '1111111111';
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00',
  };
  return {
    app,
    Vuex, // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
    Pinia, // 此处必须将 Pinia 返回
  };
}
