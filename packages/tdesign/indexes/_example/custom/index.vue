<template>
  <view class="wrap">
    <view class="custom-navbar">
      <t-navbar
        title="TDesign"
        left-arrow
      />
    </view>
    <view class="indexes">
      <t-indexes
        :index-list="indexList"
        :sticky-offset="stickyOffset + 8"
        t-class="wrapper"
        @change="onChange"
        @select="onSelect"
      >
        <template
          v-for="(item, index) in list"
          :key="index"
        >
          <t-indexes-anchor
            :index="item.index"
            t-class="anchor-wrapper"
          >
            <view :class="'capsule' + (curIndex == item.index ? ' capsule--active' : '')">
              {{ item.index }}
            </view>
          </t-indexes-anchor>

          <t-cell-group>
            <t-cell
              v-for="(city, index1) in item.children"
              :key="index1"
              :title="city"
              :bordered="item.children.length - 1 != index"
            />
          </t-cell-group>
        </template>
      </t-indexes>
    </view>
  </view>
</template>

<script>
import tIndexes from 'tdesign-uniapp/indexes/indexes.vue';
import tIndexesAnchor from 'tdesign-uniapp/indexes-anchor/indexes-anchor.vue';
import tCellGroup from 'tdesign-uniapp/cell-group/cell-group.vue';
import tCell from 'tdesign-uniapp/cell/cell.vue';
const children = new Array(5).fill('列表内容');
const list = [
  {
    index: 1,
    children,
  },
  {
    index: 3,
    children,
  },
  {
    index: 5,
    children,
  },
  {
    index: 7,
    children,
  },
  {
    index: 8,
    children,
  },
  {
    index: 10,
    children,
  },
  {
    index: '#',
    children,
  },
];
export default {
  options: {
    styleIsolation: 'shared',
  },
  onPageScroll() {},
  components: {
    tIndexes,
    tIndexesAnchor,
    tCellGroup,
    tCell,
  },
  data() {
    return {
      list,
      indexList: list.map(item => item.index),
      curIndex: '',
      stickyOffset: 0,
      city: '',
    };
  },
  mounted() {
    setTimeout(() => {
      this.getCustomNavbarHeight();
    }, 30);
  },
  methods: {
    onChange(e) {
      const { index } = e;
      console.log('change:', index);
      this.curIndex = index;
    },

    onSelect(e) {
      const { index } = e;
      console.log('select:', index);
      this.curIndex = index;
    },

    getCustomNavbarHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.custom-navbar').boundingClientRect();
      query.exec((res) => {
        const { height = 0 } = res[0] || {};
        this.stickyOffset = height;
      });
    },
  },
};
</script>
<style scoped>
@import './index.css';
</style>
