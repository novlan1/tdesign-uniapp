<template>
  <view>
    <t-grid
      class="block"
      :column="4"
    >
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img2"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
      />
      <t-grid-item
        t-class-image="image"
        text="最多五个字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img3"
      />
      <t-grid-item
        t-class-image="image"
        text="标题文字"
        :image="img1"
      />
      <t-grid-item
        t-class-image="image"
        text="最多五个字"
        :image="img2"
      />
    </t-grid>
  </view>
</template>

<script>
import tGrid from 'tdesign-uniapp/grid/grid.vue';
import tGridItem from 'tdesign-uniapp/grid-item/grid-item.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tGrid,
    tGridItem,
  },
  data() {
    return {
      img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
      img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
      img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
