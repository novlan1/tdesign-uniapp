<template>
  <view>
    <t-textarea
      t-class="external-class"
      placeholder="请输入文字"
      :disable-default-padding="true"
    />
  </view>
</template>

<script>
import tTextarea from 'tdesign-uniapp/textarea/textarea';
export default {
  components: {
    tTextarea,
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
