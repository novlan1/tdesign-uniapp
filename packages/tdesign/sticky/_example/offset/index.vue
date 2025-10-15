<template>
  <view>
    <t-sticky :offset-top="40 + navbarHeight">
      <t-button
        size="large"
        theme="danger"
        t-class="external-class"
      >
        吸顶距离
      </t-button>
    </t-sticky>
  </view>
</template>

<script>
import tSticky from 'tdesign-uniapp/sticky/sticky.vue';
import tButton from 'tdesign-uniapp/button/button.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tSticky,
    tButton,
  },
  props: {
    navbarHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
@import './index.css';
</style>
