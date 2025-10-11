<template>
  <view>
    <view class="example-search">
      <t-search placeholder="搜索预设文案" />
    </view>

    <view class="example-search">
      <t-search
        placeholder="输入tdesign，有预览结果"
        :result-list="resultList"
        @change="onChangeValue"
      />
    </view>
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
      resultList: [],
    };
  },
  created() {},
  methods: {
    onChangeValue(e) {
      const { value } = e;
      const list = ['tdesign-vue', 'tdesign-react', 'tdesign-miniprogram', 'tdesign-angular', 'tdesign-mobile-vue', 'tdesign-mobile-react'];
      this.resultList = value ? list.filter(v => v.includes(value)) : [];
    },
  },
};
</script>
<style>
@import './index.css';
</style>
