<template>
  <view>
    <t-slider 
      :value="value" 
      :min="0" 
      :max="3" 
      :step="1" 
      :marks="marks" 
      @change="handleSliderChange" 
    />
    <view class="qrcode-content">
      <t-qrcode value="https://tdesign.gtimg.com/site/tdesign-logo.png" :level="currentLevel" status="active" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'QRCodeLevel',
  data() {
    return {
      value: 1,
      marks: {
        0: '7%',
        1: '15%',
        2: '25%',
        3: '35%',
      },
      currentLevel: 'M',
    };
  },
  methods: {
    handleSliderChange(e) {
      const { value } = e.detail;
      const levels = ['L', 'M', 'Q', 'H'];
      this.value = value;
      this.currentLevel = levels[value];
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
