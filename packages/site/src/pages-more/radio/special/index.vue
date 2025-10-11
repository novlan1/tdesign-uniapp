<template>
  <view>
    <t-radio-group
      :value="value"
      allow-uncheck
      @change="onChange"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (value == index ? 'card--active' : '')"
      >
        <t-icon
          v-if="value == index"
          name="check"
          t-class="card__icon"
        />

        <t-radio
          :value="index"
          label="单选"
          content="描述信息描述信息描述信息描述信息描述信息"
          icon="none"
          borderless
        />
      </view>
    </t-radio-group>

    <view
      class="demo-desc"
      style="margin: 48rpx 32rpx 32rpx"
    >
      横向卡片单选框
    </view>

    <t-radio-group
      t-class="horizontal-box"
      :value="value1"
      @change="onChange1"
    >
      <view
        v-for="(item, index) in 3"
        :key="index"
        :class="'card ' + (value1 == index ? 'card--active' : '')"
      >
        <t-icon
          v-if="value1 == index"
          name="check"
          t-class="card__icon"
        />

        <t-radio
          :value="index"
          label="单选"
          icon="none"
          borderless
        />
      </view>
    </t-radio-group>
  </view>
</template>

<script>
import tRadioGroup from 'tdesign-uniapp/radio-group/radio-group';
import tRadio from 'tdesign-uniapp/radio/radio';
import tIcon from 'tdesign-uniapp/icon/icon';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tRadioGroup,
    tRadio,
    tIcon,
  },
  data() {
    return {
      value: 0,
      value1: 0,
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.value = e.value;
    },
    onChange1(e) {
      this.value1 = e.value;
    },
  },
};
</script>
<style>
@import './index.css';
</style>
