<template>
    <view>
        <view
            v-if="realVisible && preventScrollThrough"
            :class="prefix + '-overlay ' + transitionClass + ' class'"
            :style="_._style(['--td-overlay-transition-duration:' + duration + 'ms', 'z-index:' + _zIndex, 'top:' + distanceTop + 'px', computedStyle, style, customStyle])"
            @tap="handleClick"
            @touchmove.stop.prevent="noop"
            @transitionend="onTransitionEnd"
            :aria-role="ariaRole || 'button'"
            :aria-label="ariaLabel || '关闭'"
        >
            <slot />
        </view>
        <view
            v-else-if="realVisible"
            :class="prefix + '-overlay ' + transitionClass + ' class'"
            :style="_._style(['z-index:' + _zIndex, 'top:' + distanceTop + 'px', computedStyle, style, customStyle])"
            @tap="handleClick"
            @transitionend="onTransitionEnd"
            :aria-role="ariaRole || 'button'"
            :aria-label="ariaLabel || '关闭'"
        >
            <slot />
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import transition from "../mixins/transition";
import useCustomNavbar from "../mixins/using-custom-navbar";
const {
  prefix: prefix
} = config;
const name = `${prefix}-overlay`;
let Overlay = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this = props;
    this.behaviors = [transition(), useCustomNavbar];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      computedStyle: "",
      _zIndex: 11000
    });
    this.observers = {
      backgroundColor(o) {
        this.setData({
          computedStyle: o ? `background-color: ${o};` : ""
        });
      },
      zIndex(o) {
        if (0 !== o) {
          this.setData({
            _zIndex: o
          });
        }
      }
    };
    this.methods = {
      handleClick() {
        this.$emit("click", {
          detail: {
            visible: !this.visible
          }
        });
      },
      noop() {}
    };
  }
};
Overlay = __decorate([wxComponent()], Overlay);
export default Overlay;
</script>
<style>
@import './overlay.css';
</style>
