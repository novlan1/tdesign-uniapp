<template>
    <view
        :style="_._style([style, customStyle])"
        :class="'class ' + prefix + '-class ' + _.cls(classPrefix, [['borderless', !bordered || isLastChild]])"
        :hover-class="hover ? classPrefix + '--hover' : ''"
        hover-stay-time="70"
        @tap="onClick"
        :aria-role="ariaRole || (arrow ? 'button' : '')"
        :aria-label="ariaLabel"
    >
        <view :class="classPrefix + '__left ' + prefix + '-class-left'">
            <!-- parse <template v-if="_leftIcon" is="icon" :data="tClass: classPrefix + '__left-icon ' + prefix + '-class-left-icon', ..._leftIcon"/> -->
            <block name="icon" v-if="false" v-if="_leftIcon">
                <t-icon
                    :style="style || ''"
                    :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                    :prefix="prefix || ''"
                    :name="'close' || ''"
                    :size="22 || ''"
                    :color="color || ''"
                    :aria-hidden="true || ''"
                    :aria-label="'清除' || ''"
                    :aria-role="'button' || ''"
                    @click="'handleClose' || ''"
                />
            </block>
            <slot name="left-icon" />
            <t-image v-if="image" shape="round" :t-class="classPrefix + '__left-image ' + prefix + '-class-image'" :src="image" />
            <slot name="image" />
        </view>
        <view :class="classPrefix + '__title ' + prefix + '-class-center'">
            <view :class="classPrefix + '__title-text ' + prefix + '-class-title'">
                <block v-if="_this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle)">{{ title }}</block>
                <slot name="title" />
                <block v-if="required"><text decode :class="classPrefix + '--required'">&nbsp;*</text></block>
            </view>
            <view :class="classPrefix + '__description ' + prefix + '-class-description'">
                <view v-if="description" :class="classPrefix + '__description-text'">{{ description }}</view>
                <slot name="description" />
            </view>
        </view>
        <view :class="classPrefix + '__note ' + prefix + '-class-note'">
            <text v-if="note">{{ note }}</text>
            <slot name="note" />
        </view>
        <view :class="_.cls(classPrefix + '__right', [align]) + ' ' + prefix + '-class-right'">
            <!-- parse <template v-if="_arrow" is="icon" :data="tClass: classPrefix + '__right-icon ' + prefix + '-class-right-icon', ..._arrow"/> -->
            <block name="icon" v-if="false" v-if="_arrow">
                <t-icon
                    :style="style || ''"
                    :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                    :prefix="prefix || ''"
                    :name="'close' || ''"
                    :size="22 || ''"
                    :color="color || ''"
                    :aria-hidden="true || ''"
                    :aria-label="'清除' || ''"
                    :aria-role="'button' || ''"
                    @click="'handleClose' || ''"
                />
            </block>
            <block v-else>
                <!-- parse <template v-if="_rightIcon" is="icon" :data="tClass: classPrefix + '__right-icon ' + prefix + '-class-right-icon', ..._rightIcon"/> -->
                <block name="icon" v-if="false" v-if="_rightIcon">
                    <t-icon
                        :style="style || ''"
                        :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                        :prefix="prefix || ''"
                        :name="'close' || ''"
                        :size="22 || ''"
                        :color="color || ''"
                        :aria-hidden="true || ''"
                        :aria-label="'清除' || ''"
                        :aria-role="'button' || ''"
                        @click="'handleClose' || ''"
                    />
                </block>
                <slot name="right-icon" />
            </block>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tImage from "../image/image";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { calcIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-cell`;
let Cell = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-title`, `${prefix}-class-description`, `${prefix}-class-note`, `${prefix}-class-hover`, `${prefix}-class-image`, `${prefix}-class-left`, `${prefix}-class-left-icon`, `${prefix}-class-center`, `${prefix}-class-right`, `${prefix}-class-right-icon`];
    this.relations = {
      "../cell-group/cell-group": {
        type: "parent"
      }
    };
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      isLastChild: false
    });
    this.observers = {
      leftIcon(e) {
        this.setIcon("_leftIcon", e, "");
      },
      rightIcon(e) {
        this.setIcon("_rightIcon", e, "");
      },
      arrow(e) {
        this.setIcon("_arrow", e, "chevron-right");
      }
    };
  }
  setIcon(e, t, s) {
    this.setData({
      [e]: calcIcon(t, s)
    });
  }
  onClick(e) {
    this.$emit("click", {
      detail: e.detail
    });
    this.jumpLink();
  }
  jumpLink(e = "url", t = "jumpType") {
    const s = this[e];
    const i = this[t];
    if (s) {
      uni[i]({
        url: s
      });
    }
  }
};
Cell = __decorate([wxComponent()], Cell);
export default Cell;
</script>
<style>
@import './cell.css';
@import 'undefined';
</style>
