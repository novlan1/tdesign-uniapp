<template>
    <view
        :style="_._style([style, customStyle])"
        :class="_this.getBadgeOuterClass({ shape }) + ' class ' + prefix + '-class'"
        :aria-labelledby="labelID"
        :aria-describedby="descriptionID"
        :aria-role="ariaRole || 'option'"
    >
        <view :id="labelID" :class="classPrefix + '__content ' + prefix + '-class-content'" :aria-hidden="true">
            <slot v-if="!content" :class="classPrefix + '__content-slot'" />
            <text v-else :class="classPrefix + '__content-text'">{{ content }}</text>
        </view>
        <view
            :aria-hidden="true"
            :aria-label="ariaLabel || _.getBadgeAriaLabel({ dot, count, maxCount })"
            v-if="_this.isShowBadge({ dot, count, showZero })"
            :id="descriptionID"
            :class="_this.getBadgeInnerClass({ dot, size, shape, count }) + ' ' + prefix + '-has-count ' + prefix + '-class-count'"
            :style="_._style([_this.getBadgeStyles({ color, offset })])"
        >
            {{ _this.getBadgeValue({ dot, count, maxCount }) }}
        </view>
        <slot name="count" />
    </view>
</template>
<script module="_this" lang="wxs" src="@/badge/badge.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { uniqueFactory } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-badge`;
const getUniqueID = uniqueFactory("badge");
let Badge = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-count`, `${prefix}-class-content`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      value: "",
      labelID: "",
      descriptionID: ""
    });
    this.lifetimes = {
      ready() {
        const e = getUniqueID();
        this.setData({
          labelID: `${e}_label`,
          descriptionID: `${e}_description`
        });
      }
    };
  }
};
Badge = __decorate([wxComponent()], Badge);
export default Badge;
</script>
<style>
@import './badge.css';
</style>
