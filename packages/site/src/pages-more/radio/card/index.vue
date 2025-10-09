<template>
  <view>
    <t-radio-group
      t-class="theme-card"
      default-value="radio1"
    >
      <t-radio
        label="单选"
        value="radio1"
        default-checked
      />
      <t-radio
        label="单选"
        value="radio2"
      />
      <t-radio
        label="单选标题多行单选标题多行单选标题多行单选标题多行单选标题多行"
        value="radio3"
      />
    </t-radio-group>
  </view>
</template>

<script>
import tRadioGroup from 'tdesign-uniapp/radio-group/radio-group';
import tRadio from 'tdesign-uniapp/radio/radio';
export default {
  components: {
    tRadioGroup,
    tRadio,
  },
  /**
     * 组件的属性列表
     */
  props: {},
  data() {
    return {};
  },
  created() {},
  /**
     * 组件的方法列表
     */
  methods: {
    onChange() {},
  },
};
</script>
<style>
@import './index.css';
</style>
