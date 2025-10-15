<template>
  <view>
    <view class="demo-rate">
      <view class="demo-rate__title">
        大尺寸 24
      </view>
      <t-rate
        :value="value[0]"
        :data-index="0"
        @change="onChange($event, { index: 0 })"
      />
    </view>
    <view class="demo-rate">
      <view class="demo-rate__title">
        小尺寸 20
      </view>
      <t-rate
        :value="value[1]"
        :data-index="1"
        :size="20"
        @change="onChange($event, { index: 1 })"
      />
    </view>
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
      value: [3, 3],
    };
  },
  created() {},
  methods: {
    onChange(e, { index }) {
      const { value } = e;
      this.value[index] = value;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
