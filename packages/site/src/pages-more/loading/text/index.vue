<template>
  <view>
    <t-loading
      :indicator="false"
      text="加载中..."
    />
  </view>
</template>

<script>
import tLoading from 'tdesign-uniapp/loading/loading';
export default {
  components: {
    tLoading,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
