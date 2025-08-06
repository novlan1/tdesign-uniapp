<template>
    <view>
        <view
            v-if="realVisible"
            :style="_._style([popup.getPopupStyles(zIndex, distanceTop, placement), style, customStyle])"
            :class="_.cls(classPrefix, [placement]) + ' ' + transitionClass + ' class ' + prefix + '-class'"
            @transitionend="onTransitionEnd"
        >
            <view
                :data-prevention="preventScrollThrough || (overlayProps ? !!overlayProps.preventScrollThrough : false)"
                @touchmove="parseEventDynamicCode($event, popup.onContentTouchMove)"
                :class="classPrefix + '__content ' + prefix + '-class-content'"
            >
                <slot name="content" />
                <slot />
                <view :class="classPrefix + '__close'" @tap="handleClose">
                    <t-icon name="close" v-if="closeBtn" size="64rpx" />
                    <slot name="close-btn" :class="classPrefix + '-slot'" />
                </view>
            </view>
        </view>
        <t-overlay
            id="popup-overlay"
            v-if="showOverlay"
            :visible="visible"
            :usingCustomNavbar="usingCustomNavbar"
            :z-index="(overlayProps && overlayProps.zIndex) || 11000"
            :duration="(overlayProps && overlayProps.duration) || 300"
            :background-color="(overlayProps && overlayProps.backgroundColor) || ''"
            :prevent-scroll-through="preventScrollThrough || (overlayProps ? !!overlayProps.preventScrollThrough : false)"
            @tap.native="handleOverlayClick($event, { tagId: 'popup-overlay' })"
            :custom-style="(overlayProps && overlayProps.style) || ''"
        />
    </view>
</template>
<script module="popup" lang="wxs" src="@/popup/popup.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tOverlay from "../overlay/overlay";
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import transition from "../mixins/transition";
import useCustomNavbar from "../mixins/using-custom-navbar";
delete props.visible;
const {
  prefix: prefix
} = config;
const name = `${prefix}-popup`;
let Popup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
    this.behaviors = [transition(), useCustomNavbar];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.methods = {
      handleOverlayClick() {
        const {
          closeOnOverlayClick: e
        } = this;
        if (e) {
          this.$emit("visible-change", {
            detail: {
              visible: false,
              trigger: "overlay"
            }
          });
        }
      },
      handleClose() {
        this.$emit("visible-change", {
          detail: {
            visible: false,
            trigger: "close-btn"
          }
        });
      }
    };
  }
};
Popup = __decorate([wxComponent()], Popup);
export default Popup;
</script>
<style>
@import './popup.css';
</style>
