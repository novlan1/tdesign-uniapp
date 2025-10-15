<template>
  <view class="demo-rate">
    <view class="demo-rate__title">
      实心评分
    </view>

    <t-rate
      :value="value"
      @change="onChange"
    />
  </view>
</template>

<script>
import tRate from 'tdesign-uniapp/rate/rate.vue';
export default {
  components: {
    tRate,
  },
  data() {
    return {
      value: 3,
    };
  },
  created() {},
  methods: {
    onChange(e) {
      const { value } = e;
      this.value = value;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
