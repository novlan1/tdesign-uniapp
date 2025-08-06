<template>
    <view
        :style="_._style([style, customStyle])"
        :class="_.cls(classPrefix, [layout, ['readonly', readonly]]) + ' class ' + prefix + '-class'"
        @tap="onTap"
        :aria-role="ariaRole || readonly ? 'option' : 'button'"
        :aria-label="ariaLabel || t.getAriaLabel(index, title, content)"
        :aria-current="curStatus == 'process' ? 'step' : ''"
    >
        <view :class="_.cls(classPrefix + '__anchor', [layout])" :aria-hidden="true">
            <view v-if="isDot" :class="_.cls(classPrefix + '__dot', [curStatus])" />
            <view v-else-if="icon" :class="_.cls(classPrefix + '__icon', [curStatus])">
                <slot v-if="icon == 'slot'" name="icon" />
                <t-icon v-else :name="icon" size="44rpx" />
            </view>
            <view v-else :class="_.cls(classPrefix + '__circle', [curStatus])">
                <t-icon v-if="curStatus == 'finish'" name="check" />
                <t-icon v-else-if="curStatus == 'error'" name="close" />
                <block v-else>{{ index + 1 }}</block>
            </view>
        </view>
        <view :class="_.cls(classPrefix + '__content', [layout, ['last', isLastChild]]) + ' ' + prefix + '-class-content'" :aria-hidden="true">
            <slot />
            <view :class="_.cls(classPrefix + '__title', [curStatus, layout]) + ' ' + prefix + '-class-title'">
                <block v-if="title">{{ _this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle) }}</block>
                <slot name="title" />
                <slot v-if="layout === 'vertical'" name="title-right" />
            </view>
            <view :class="_.cls(classPrefix + '__description', [layout]) + ' ' + prefix + '-class-description'">
                <block v-if="content">{{ content }}</block>
                <slot name="content" />
            </view>
            <view :class="_.cls(classPrefix + '__extra', [layout]) + ' ' + prefix + '-class-extra'"><slot name="extra" /></view>
        </view>
        <view v-if="!isLastChild" :class="_.cls(classPrefix + '__line', [curStatus, layout, theme, sequence])" :aria-hidden="true" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="t" lang="wxs" src="@/step-item/step-item.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-steps-item`;
let StepItem = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.relations = {
      "../steps/steps": {
        type: "parent"
      }
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-title`, `${prefix}-class-description`, `${prefix}-class-extra`];
    this = props;
    this.setData({
      classPrefix: name,
      prefix: prefix,
      index: 0,
      isDot: false,
      curStatus: "",
      layout: "vertical",
      isLastChild: false,
      sequence: "positive"
    });
    this.observers = {
      status(t) {
        const {
          curStatus: e
        } = this;
        if ("" !== e && t !== e) {
          this.setData({
            curStatus: t
          });
        }
      }
    };
    this.methods = {
      updateStatus({
        current: t,
        currentStatus: e,
        index: s,
        theme: i,
        layout: r,
        items: o,
        sequence: a
      }) {
        let p = this.status;
        if ("default" === p) {
          if (s < Number(t)) {
            p = "finish";
          } else {
            if (s === Number(t)) {
              p = e;
            }
          }
        }
        this.setData({
          curStatus: p,
          index: s,
          isDot: "dot" === i,
          layout: r,
          theme: i,
          sequence: a,
          isLastChild: s === ("positive" === a ? o.length - 1 : 0)
        });
      },
      onTap() {
        this.$parent.handleClick(this.index);
      }
    };
  }
};
StepItem = __decorate([wxComponent()], StepItem);
export default StepItem;
</script>
<style>
@import './step-item.css';
</style>
