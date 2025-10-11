<template>
  <view>
    <t-avatar
      class="avatar-example"
      :image="image"
      :badge-props="{dot: true, offset: [0, 4] }"
    />
    <t-avatar
      class="avatar-example"
      t-class-content="external-class-content"
      :badge-props="{count: 8, offset: [-6, 6] }"
    >
      A
    </t-avatar>
    <t-avatar
      class="avatar-example"
      icon="user"
      :badge-props="{count: 12, offset: [-6, 6] }"
    />
  </view>
</template>

<script>
import tAvatar from 'tdesign-uniapp/avatar/avatar';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tAvatar,
  },
  data() {
    return {
      image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
