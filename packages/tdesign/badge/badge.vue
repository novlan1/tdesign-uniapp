<template>
  <view
    :style="_._style([style, customStyle])"
    :class="getBadgeOuterClass({ shape }) + ' class ' + prefix + '-class'"
    :aria-labelledby="labelID"
    :aria-describedby="descriptionID"
    :aria-role="ariaRole || 'option'"
  >
    <view
      :id="labelID"
      :class="classPrefix + '__content ' + prefix + '-class-content'"
      :aria-hidden="true"
    >
      <slot
        v-if="!content"
        :class="classPrefix + '__content-slot'"
      />
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
      :class="getBadgeInnerClass({ dot, size, shape, count }) + ' ' + prefix + '-has-count ' + prefix + '-class-count'"
      :style="_._style([getBadgeStyles({ color, offset })])"
    >
      {{ getBadgeValue({ dot, count, maxCount }) }}
    </view>
    <slot name="count" />
  </view>
</template>
<script>
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { uniqueFactory } from '../common/utils';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';
import {
  getBadgeValue,
  getBadgeStyles,
  getBadgeOuterClass,
  getBadgeInnerClass,
  isShowBadge,
} from './badge.wxs';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-badge`;
const getUniqueID = uniqueFactory('badge');
let Badge = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true,
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-count`, `${prefix}-class-content`];
    this.properties = props;
    this._ = _;
    this.setData({
      prefix,
      classPrefix: name,
      value: '',
      labelID: '',
      descriptionID: '',
    });
    this.lifetimes = {
      ready() {
        const e = getUniqueID();
        this.setData({
          labelID: `${e}_label`,
          descriptionID: `${e}_description`,
        });
      },
    };
    this.methods = {
      getBadgeValue,
      getBadgeStyles,
      getBadgeOuterClass,
      getBadgeInnerClass,
      isShowBadge,
    };
  }
};
Badge = initTDesign(__decorate([wxComponent()], Badge));
export default Badge;
</script>
<style>
@import './badge.css';
</style>
