<template>
  <view>
    <t-row gutter="16">
      <t-col span="8">
        <view class="dark">
          col-8
        </view>
      </t-col>
      <t-col span="8">
        <view class="dark">
          col-8
        </view>
      </t-col>
      <t-col span="8">
        <view class="dark">
          col-8
        </view>
      </t-col>
    </t-row>
  </view>
</template>

<script>
import tCol from 'tdesign-uniapp/col/col.vue';
import tRow from 'tdesign-uniapp/row/row.vue';
export default {
  components: {
    tCol,
    tRow,
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
