export default {
  data: {
    skylineRender: false,
  },
  lifetimes: {
    created() {
      this.skylineRender = this.renderer === 'skyline';
    },
  },
};
