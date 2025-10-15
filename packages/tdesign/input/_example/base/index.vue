<template>
  <view>
    <t-input
      label="标签文字"
      placeholder="请输入文字"
    />

    <t-input placeholder="请输入文字">
      <template
        #label
      >
        <view
          class="custom-label"
        >
          标签文字
        </view>
      </template>
    </t-input>

    <t-input placeholder="请输入文字" />
  </view>
</template>

<script>
import tInput from 'tdesign-uniapp/input/input.vue';
export default {
  components: {
    tInput,
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
