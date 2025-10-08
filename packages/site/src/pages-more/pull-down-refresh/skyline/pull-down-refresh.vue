<template>
  <view>
    <t-navbar
      class="demo-navbar"
      title="PullDownRefresh"
      left-arrow
    />
    <baseComp />
  </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import baseComp from '../base';
export default {
  components: {
    tNavbar,
    baseComp,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
@import './pull-down-refresh.css';
</style>
