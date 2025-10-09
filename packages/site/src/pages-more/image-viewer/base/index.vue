<template>
  <view>
    <t-button
      theme="primary"
      size="large"
      variant="outline"
      block
      @click="onClick"
    >
      基础图片预览
    </t-button>
    <t-toast id="t-toast" />
    <t-image-viewer
      using-custom-navbar
      :delete-btn="deleteBtn"
      :close-btn="closeBtn"
      :show-index="showIndex"
      :visible="visible"
      :images="images"
      @change="onChange"
      @delete="onDelete"
      @close="onClose"
    />
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tToast from 'tdesign-uniapp/toast/toast';
import tImageViewer from 'tdesign-uniapp/image-viewer/image-viewer';
import Toast from 'tdesign-uniapp/toast/index';
export default {
  components: {
    tButton,
    tToast,
    tImageViewer,
  },
  data() {
    return {
      visible: false,
      showIndex: false,
      closeBtn: false,
      deleteBtn: false,
      images: [],
    };
  },
  created() {},
  methods: {
    onClick() {
      this.images = ['https://tdesign.gtimg.com/mobile/demos/swiper1.png', 'https://tdesign.gtimg.com/mobile/demos/swiper2.png'];
      this.showIndex = true;
      this.visible = true;
    },
    onChange(e) {
      const { index } = e.detail;
      console.log('change', index);
    },
    onDelete(e) {
      const { index } = e.detail;
      Toast({
        context: this,
        selector: '#t-toast',
        message: `删除第${index + 1}个`,
      });
    },
    onClose(e) {
      const { trigger } = e.detail;
      console.log(trigger);
      this.visible = false;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
