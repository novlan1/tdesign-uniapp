<template>
  <view class="index">
    <div
      v-for="(item, index) of componentData.data"
      :key="index"
      class="index__li"
      @click.stop="() => clickComponentItem(item)"
    >
      {{ item.name }}
    </div>
    <!-- <TLoading /> -->
  </view>
</template>

<script setup lang="ts">
// import TLoading from 'tdesign-uniapp/loading/loading';
import componentData from './config.json';

const clickComponentItem = (item) => {
  uni.navigateTo({
    // TODO: 改成 index.vue，方便使用者引入
    url: `/pages-more/${item.name}/${item.name}`,
  });
};
</script>

<style lang="scss" scoped>
.index {
  margin: 20px;
  &__li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #eee;
  }
}
</style>
