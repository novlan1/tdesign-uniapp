<template>
    <view>
        <view
            v-if="realVisible"
            :class="_.cls(classPrefix, [direction, theme, ['with-text', message]]) + ' class ' + prefix + '-class ' + transitionClass"
            :style="_._style(['top:' + (placement === 'top' ? '25%' : placement === 'bottom' ? '75%' : '45%'), style, customStyle])"
            @transitionend="onTransitionEnd"
            @touchstart.stop.prevent="loop"
        >
            <view :class="classPrefix + '__content ' + classPrefix + '__content--' + direction">
                <t-loading v-if="isLoading" theme="circular" :size="direction === 'row' ? '48rpx' : '64rpx'" loading inherit-color layout="vertical" />
                <!-- parse <template v-else-if="_icon" is="icon" :data="ariaHidden: true, tClass: classPrefix + '__icon ' + classPrefix + '__icon--' + direction, ..._icon"/> -->
                <block name="icon" v-if="false" v-else-if="_icon">
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
                <slot name="icon" />
                <view aria-role="alert" :class="classPrefix + '__text ' + classPrefix + '__text--' + direction">{{ message }}</view>
                <slot name="message" />
            </view>
        </view>
        <t-overlay
            :style="(overlayProps && overlayProps.style) || ''"
            :visible="realVisible && (showOverlay || preventScrollThrough)"
            :z-index="(overlayProps && overlayProps.zIndex) || 11000"
            :duration="(overlayProps && overlayProps.duration) || 300"
            :usingCustomNavbar="(overlayProps && overlayProps.usingCustomNavbar) || usingCustomNavbar"
            :backgroundColor="preventScrollThrough ? 'transparent' : (overlayProps && overlayProps.backgroundColor) || ''"
            :preventScrollThrough="preventScrollThrough || (overlayProps && overlayProps.preventScrollThrough)"
        />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tLoading from "../loading/loading";
import tOverlay from "../overlay/overlay";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import transition from "../mixins/transition";
import { calcIcon } from "../common/utils";
import useCustomNavbar from "../mixins/using-custom-navbar";
const {
  prefix: prefix
} = config;
const name = `${prefix}-toast`;
let Toast = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.options = {
      multipleSlots: true
    };
    this.behaviors = [transition(), useCustomNavbar];
    this.hideTimer = null;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      typeMapIcon: ""
    });
    this = props;
    this.lifetimes = {
      detached() {
        this.destroyed();
      }
    };
    this.pageLifetimes = {
      hide() {
        this.hide();
      }
    };
    this.methods = {
      show(e) {
        if (this.hideTimer) {
          clearTimeout(this.hideTimer);
        }
        const i = {
          loading: "loading",
          success: "check-circle",
          warning: "error-circle",
          error: "close-circle"
        }[null == e ? void 0 : e.theme];
        const t = {
          direction: props.direction.value,
          duration: props.duration.value,
          icon: props.icon.value,
          message: props.message.value,
          placement: props.placement.value,
          preventScrollThrough: props.preventScrollThrough.value,
          theme: props.theme.value
        };
        const o = Object.assign(Object.assign(Object.assign({}, t), e), {
          visible: true,
          isLoading: "loading" === (null == e ? void 0 : e.theme),
          _icon: calcIcon(null != i ? i : e.icon)
        });
        const {
          duration: s
        } = o;
        this.setData(o);
        if (s > 0) {
          this.hideTimer = setTimeout(() => {
            this.hide();
          }, s);
        }
      },
      hide() {
        var e;
        var i;
        if (this.visible) {
          this.setData({
            visible: false
          });
          null === (i = null === (e = this) || void 0 === e ? void 0 : e.close) || void 0 === i || i.call(e);
          this.$emit("close");
        }
      },
      destroyed() {
        if (this.hideTimer) {
          clearTimeout(this.hideTimer);
          this.hideTimer = null;
        }
        this.$emit("destory");
      },
      loop() {}
    };
  }
};
Toast = __decorate([wxComponent()], Toast);
export default Toast;
</script>
<style>
@import './toast.css';
@import 'undefined';
</style>
