<template>
  <view
    :class="'class ' + prefix + '-row'"
    :style="getRowStyles(gutter, style, customStyle)"
  >
    <slot />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { getRowStyles } from './computed.js';
import { ParentMixin, RELATION_MAP } from '../common/relation';

const name = `${prefix}-row`;


export default uniComponent({
  name,
  mixins: [ParentMixin(RELATION_MAP.Col)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      _,
    };
  },
  watch: {
    gutter: {
      handler() {
        this.setGutter();
      },
      immediate: true,
    },
  },
  methods: {
    getRowStyles,
    innerAfterLinked() {
      this.setGutter();
    },
    setGutter() {
      const {
        gutter,
      } = this;

      this.children?.forEach((o) => {
        o.gutter = gutter;
      });
    },
  },
});

</script>
<style scoped lang="less">
@import './row.less';
</style>
