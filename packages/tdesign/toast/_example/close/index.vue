<template>
  <view>
    <t-toast
      id="t-toast"
      ref="t-toast"
    />

    <view class="box">
      <view class="toast-example">
        <t-button
          theme="primary"
          size="large"
          variant="outline"
          @click="handleShow"
        >
          显示提示
        </t-button>
        <t-button
          theme="primary"
          size="large"
          variant="outline"
          @click="handleHide"
        >
          关闭提示
        </t-button>
      </view>
    </view>
  </view>
</template>

<script>
import tToast from 'tdesign-uniapp/toast/toast.vue';
import Toast, { hideToast } from 'tdesign-uniapp/toast/index';
import tButton from 'tdesign-uniapp/button/button.vue';


export default {
  components: {
    tToast,
    tButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleShow() {
      Toast({
        context: this,
        selector: '#t-toast',
        duration: -1,
        message: '轻提示文字内容',
      });
    },
    handleHide() {
      hideToast({
        context: this,
        selector: '#t-toast',
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
