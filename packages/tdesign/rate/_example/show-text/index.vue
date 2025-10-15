<template>
  <view>
    <view class="demo-rate">
      <view class="demo-rate__title">
        带描述评分
      </view>
      <!-- 自定义带描述评分，设置属性：texts -->
      <t-rate
        :value="value[0]"
        :data-index="0"
        :show-text="true"
        :texts="texts"
        @change="onChange($event, { index: 0 })"
      />
    </view>
    <view class="demo-rate">
      <view class="demo-rate__title">
        带描述评分
      </view>
      <!-- 带描述评分，设置属性：showText -->
      <t-rate
        :value="value[1]"
        :data-index="1"
        :show-text="true"
        @change="onChange($event, { index: 1 })"
      />
    </view>

    <view class="demo-rate">
      <view class="demo-rate__title">
        带描述评分
      </view>
      <t-rate
        :value="value[2]"
        :data-index="2"
        :show-text="true"
        @change="onChange($event, { index: 2 })"
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
      value: [3, 3, 0],
      texts: ['1分', '2分', '3分', '4分', '5分'],
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
