<template>
  <view
    :style="_._style([style, customStyle])"
    :class="[
      'class ' ,
      tClass,
      _.cls(classPrefix, [['bordered', bordered || isLastChild]])
    ]"
    :hover-class="hover ? classPrefix + '--hover' : ''"
    hover-stay-time="70"
    :aria-role="ariaRole || (arrow ? 'button' : '')"
    :aria-label="ariaLabel"
    @tap="onClick"
  >
    <view :class="classPrefix + '__left ' + tClassLeft">
      <!-- parse <template v-if="_leftIcon" is="icon" :data="tClass: classPrefix + '__left-icon ' + prefix + '-class-left-icon', ..._leftIcon"/> -->
      <block
        v-if="_leftIcon"
        name="icon"
      >
        <t-icon
          :custom-style="_leftIcon.style || ''"
          :t-class="classPrefix + '__left-icon ' + tClassLeftIcon"
          :name="_leftIcon.name"
          :size="_leftIcon.size"
          :color="_leftIcon.color"
          :aria-hidden="true"
          :aria-label="_leftIcon.ariaLabel"
          :aria-role="_leftIcon.ariaRole"
          @click="'handleClose' || ''"
        />
      </block>
      <slot name="left-icon" />
      <t-image
        v-if="image"
        shape="round"
        :t-class="classPrefix + '__left-image ' + tClassImage"
        :src="image"
      />
      <slot name="image" />
    </view>
    <view :class="classPrefix + '__title ' + tClassCenter">
      <view
        :class="[
          classPrefix + '__title-text ',
          tClassTitle
        ]"
      >
        <block v-if="title">
          {{ title }}
        </block>
        <slot name="title" />
        <block v-if="required">
          <text
            decode
            :class="classPrefix + '--required'"
          >
            &nbsp;*
          </text>
        </block>
      </view>
      <view
        :class="[
          classPrefix + '__description ',
          tClassDescription
        ]"
      >
        <view
          v-if="description"
          :class="classPrefix + '__description-text'"
        >
          {{ description }}
        </view>
        <slot name="description" />
      </view>
    </view>
    <view
      :class="[
        classPrefix + '__note ',
        tClassNote
      ]"
    >
      <text v-if="note">
        {{ note }}
      </text>
      <slot name="note" />
    </view>
    <view
      :class="[
        _.cls(classPrefix + '__right', [align]),
        tClassRight
      ]"
    >
      <!-- parse <template v-if="_arrow" is="icon" :data="tClass: classPrefix + '__right-icon ' + prefix + '-class-right-icon', ..._arrow"/> -->
      <t-icon
        v-if="_arrow"
        :custom-style="_arrow.style || ''"
        :t-class=" classPrefix + '__right-icon ' + tClassRightIcon"
        :name="_arrow.name || ''"
        :size="_arrow.size"
        :color="_arrow.color"
        :aria-hidden="true"
        :aria-label="_arrow.ariaLabel"
        :aria-role="_arrow.ariaRole"
        @click="'handleClose' || ''"
      />
      <block v-else>
        <!-- parse <template v-if="_rightIcon" is="icon" :data="tClass: classPrefix + '__right-icon ' + prefix + '-class-right-icon', ..._rightIcon"/> -->
        <block
          v-if="_rightIcon"
          name="icon"
        >
          <t-icon
            :custom-style="_rightIcon.style || ''"
            :t-class=" classPrefix + '__right-icon ' + tClassRightIcon"
            :name="_rightIcon.name"
            :size="_rightIcon.size"
            :color="_rightIcon.color || ''"
            :aria-hidden="true"
            :aria-label="_rightIcon.ariaLabel"
            :aria-role="_rightIcon.ariaRole"
            @click="'handleClose' || ''"
          />
        </block>
        <slot name="right-icon" />
      </block>
    </view>
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import tImage from '../image/image';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
import _ from '../common/utils.wxs';

import { ChildrenMixin, RELATION_MAP } from '../common/relation';

const name = `${prefix}-cell`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-title`,
    `${prefix}-class-description`,
    `${prefix}-class-note`,
    `${prefix}-class-hover`,
    `${prefix}-class-image`,
    `${prefix}-class-left`,
    `${prefix}-class-left-icon`,
    `${prefix}-class-center`,
    `${prefix}-class-right`,
    `${prefix}-class-right-icon`,
  ],
  mixins: [ChildrenMixin(RELATION_MAP.Cell)],
  components: {
    tIcon,
    tImage,
  },
  props: {
    ...props,
  },
  emits: [
    'click',
  ],
  data() {
    return {
      prefix,
      classPrefix: name,
      _arrow: null,
      _rightIcon: null,
      _leftIcon: null,
      isLastChild: false,
      _,
    };
  },
  watch: {
    leftIcon: {
      handler(e) {
        this.setIcon('_leftIcon', e, '');
      },
      immediate: true,
    },
    rightIcon: {
      handler(e) {
        this.setIcon('_rightIcon', e, '');
      },
      immediate: true,
    },
    arrow: {
      handler(e) {
        this.setIcon('_arrow', e, 'chevron-right');
      },
      immediate: true,
    },
  },
  methods: {
    setIcon(e, t, s) {
      this[e] = calcIcon(t, s);
    },
    onClick(e) {
      this.$emit('click', {
        detail: e.detail,
      });
      this.jumpLink();
    },
    jumpLink(e = 'url', t = 'jumpType') {
      const s = this[e];
      const i = this[t];
      if (s) {
        uni[i]({
          url: s,
        });
      }
    },
  },
});
</script>
<style scoped lang="less">
@import './cell.less';
</style>
