<template>
  <view class="wrapper">
    <t-upload
      disabled
      :media-type="['video', 'image']"
      :files="originFiles"
      :grid-config="gridConfig"
      :config="config"
      source="messageFile"
      @success="handleSuccess"
      @remove="handleRemove"
    />
  </view>
</template>

<script>
import tUpload from 'tdesign-uniapp/upload/upload';
export default {
  components: {
    tUpload,
  },
  data() {
    return {
      originFiles: [
        {
          url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
          name: 'uploaded1.png',
          type: 'image',
        },
      ],
      gridConfig: {
        column: 4,
        width: 160,
        height: 160,
      },
      config: {
        count: 1,
      },
    };
  },
  created() {},
  methods: {
    handleSuccess(e) {
      const { files } = e.detail;
      this.setData({
        originFiles: files,
      });
    },
    handleRemove(e) {
      const { index } = e.detail;
      const { originFiles } = this;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
    },
  },
};
</script>
<style>
@import './index.css';
</style>
