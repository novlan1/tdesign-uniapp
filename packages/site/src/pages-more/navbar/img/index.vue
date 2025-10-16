<template>
  <view>
    <t-navbar
      t-class-placeholder="t-navbar-placeholder"
      t-class-content="t-navbar-content"
    >
      <template #left>
        <view>
          <t-image
            t-class="custom-image"
            :src="theme === 'dark' ? 'https://tdesign.gtimg.com/mobile/demos/image-dark.png' : 'https://tdesign.gtimg.com/mobile/demos/logo-light.png'"
            aria-label="导航栏图片"
          />
        </view>
      </template>
    </t-navbar>
  </view>
</template>

<script lang="ts" setup>
import tNavbar from 'tdesign-uniapp/navbar/navbar.vue';
import tImage from 'tdesign-uniapp/image/image.vue';
import { useTheme } from 'tdesign-uniapp/mixins/theme-change';


const { theme } = useTheme();

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
});
</script>
<style scoped>
.custom-image {
    height: 24px;
    width: 87px;
}
</style>
