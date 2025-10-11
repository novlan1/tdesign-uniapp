<template>
  <view
    :style="_._style([style, customStyle])"
    :class="className + ' class'"
  >
    <slot />
    <view :class="classPrefix + '__collapse--slot'">
      <slot name="collapse-avatar" />
    </view>
    <view
      v-if="max && max < length"
      :class="classPrefix + '__collapse--default'"
      @tap="onCollapsedItemClick"
    >
      <t-avatar
        :t-class-image="prefix + '-avatar--border ' + prefix + '-avatar--border-' + size + ' ' + tClassImage"
        :t-class-content="tClassContent"
        :size="size"
        :shape="shape"
        :icon="collapseAvatar ? '' : 'user-add'"
        aria-role="none"
      >
        {{ collapseAvatar }}
      </t-avatar>
    </view>
  </view>
</template>
<script>
import tAvatar from '../avatar/avatar';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import avatarGroupProps from './props';

import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-avatar-group`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-content`,
    `${prefix}-class-image`,
  ],
  mixins: [ParentMixin(RELATION_MAP.Avatar)],
  components: {
    tAvatar,
  },
  props: {
    ...avatarGroupProps,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      hasChild: true,
      length: 0,
      className: '',
      _,
    };
  },
  watch: {
    cascading: 'setClass',
    size: 'setClass',
  },
  mounted() {
    this.setClass();
    this.length = this.children.length;
    this.handleMax();
  },
  methods: {
    setClass() {
      const { cascading, size } = this;
      const direction = cascading.split('-')[0];
      const classList = [
        name,
        this.tClass,
        `${name}-offset-${direction}`,
        `${name}-offset-${direction}-${size.indexOf('px') > -1 ? 'medium' : size || 'medium'}`,
      ];

      this.className = classList.join(' ');
    },

    handleMax() {
      const { max } = this;
      const len = this.children.length;
      if (!max || max > len) return;

      const restAvatars = this.children.splice(max, len - max);

      restAvatars.forEach((child) => {
        child.hide();
      });
    },
    onCollapsedItemClick(e) {
      this.$emit('collapsed-item-click', {
        detail: e.detail,
      });
    },
  },
});
</script>
<style scoped lang="less">
@import './avatar-group.less';
</style>
