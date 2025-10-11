<template>
  <view class="example-search">
    <t-search
      v-model="value"
      center
      placeholder="搜索预设文案"
      @change="onChange"
    />
  </view>
</template>

<script>
import tSearch from 'tdesign-uniapp/search/search';
export default {
  components: {
    tSearch,
  },
  data() {
    return {
      value: '',
    };
  },
  created() {},
  methods: {
    onChange(detail) {
      console.log(`modelValue: ${detail.value}`);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
