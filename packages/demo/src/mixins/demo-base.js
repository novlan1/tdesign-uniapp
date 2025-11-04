export default {
  computed: {
    gCustomNavbarHeight() {
      let result = 0;
      // #ifdef H5 || APP-PLUS
      result = 48;
      // #endif
      return result;
    },
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
    isMPAlipay() {
      let result = false;
      // #ifdef MP-ALIPAY
      result = true;
      // #endif
      return result;
    },
  },
  mounted() {
    // 检查分享功能是否可用
    if (typeof wx.showShareMenu === 'function') {
      wx.showShareMenu({
        success: (res) => {
          console.log('分享功能启用成功', res);
        },
        fail: (err) => {
          console.error('分享功能启用失败', err);
        },
      });
    }
  },
};
