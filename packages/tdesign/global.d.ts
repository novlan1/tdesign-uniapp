declare module 'vue' {
  export interface GlobalComponents {
    TLoading: typeof import('tdesign-uniapp/loading/loading.vue').default;
  }
}
// 必须，why？
export {};
