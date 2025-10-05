<template>
  <view
    :class="[
      'class',
      tClass,
      _.cls(classPrefix, [span]),
      (offset ? classPrefix + '--offset-' + offset : '')
    ]"
    :style="getColStyles(gutter, style, customStyle)"
  >
    <slot />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { getColStyles } from './computed.js';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';

const name = `${prefix}-col`;


export default uniComponent({
  name,
  mixins: [ChildrenMixin(RELATION_MAP.Col)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      _,
      gutter: '',
    };
  },
  methods: {
    getColStyles,
  },
});

</script>
<style>
@import './col.css';
</style>
