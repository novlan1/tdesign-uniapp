<template>
  <view
    :style="_._style([style, customStyle])"
    :class="[
      getBadgeOuterClass({ shape }) + ' class ',
      tClass
    ]"
    :aria-labelledby="labelID"
    :aria-describedby="descriptionID"
    :aria-role="ariaRole || 'option'"
  >
    <view
      :id="labelID"
      :class="[
        classPrefix + '__content ',
        tClassContent,
      ]"
      :aria-hidden="true"
    >
      <!-- #ifdef H5 -->

      <slot
        v-if="!content"
        :class="classPrefix + '__content-slot'"
      />
      <!-- #endif -->

      <!-- 小程序下在 slot 下加 :class 属性，会导致渲染失败 -->
      <!-- #ifndef H5 -->
      <slot
        v-if="!content"
      />
      <!-- #endif -->

      <text
        v-else
        :class="classPrefix + '__content-text'"
      >
        {{ content }}
      </text>
    </view>
    <view
      v-if="isShowBadge({ dot, count, showZero })"
      :id="descriptionID"
      :aria-hidden="true"
      :aria-label="ariaLabel || _.getBadgeAriaLabel({ dot, count, maxCount })"
      :class="[
        getBadgeInnerClass({ dot, size, shape, count }) + ' ' + prefix + '-has-count ',
        tClassCount
      ]"
      :style="_._style([getBadgeStyles({ color, offset })])"
    >
      {{ getBadgeValue({ dot, count, maxCount }) }}
    </view>
    <slot name="count" />
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { uniqueFactory } from '../common/utils';
import _ from '../common/utils.wxs';

import {
  getBadgeValue,
  getBadgeStyles,
  getBadgeOuterClass,
  getBadgeInnerClass,
  isShowBadge,
} from './badge.wxs';


const name = `${prefix}-badge`;
const getUniqueID = uniqueFactory('badge');


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-count`,
    `${prefix}-class-content`,
  ],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      value: '',
      labelID: '',
      descriptionID: '',
      _,
    };
  },
  mounted() {
    const e = getUniqueID();
    this.labelID = `${e}_label`;
    this.descriptionID = `${e}_description`;
  },
  methods: {
    getBadgeValue,
    getBadgeStyles,
    getBadgeOuterClass,
    getBadgeInnerClass,
    isShowBadge,
  },
});

// let Badge = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.options = {
//       multipleSlots: true,
//     };
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-count`, `${prefix}-class-content`];
//     this.properties = props;
//     this._ = _;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       value: '',
//       labelID: '',
//       descriptionID: '',
//       _,
//     });
//     this.lifetimes = {
//       ready() {
//         const e = getUniqueID();
//         this.setData({
//           labelID: `${e}_label`,
//           descriptionID: `${e}_description`,
//         });
//       },
//     };
//     this.methods = {
//       getBadgeValue,
//       getBadgeStyles,
//       getBadgeOuterClass,
//       getBadgeInnerClass,
//       isShowBadge,
//     };
//   }
// };
// Badge = initTDesign(__decorate([wxComponent()], Badge));
// export default Badge;
</script>
<style>
@import './badge.css';
</style>
