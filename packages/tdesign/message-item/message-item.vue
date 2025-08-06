<template>
    <view>
        <block v-if="visible">
            <view
                :class="classPrefix + ' class ' + prefix + '-class ' + classPrefix + '--' + theme + ' ' + fadeClass"
                :style="_._style([_this.getMessageStyles(zIndex, offset, wrapTop), style, customStyle])"
                :animation="showAnimation"
                :id="id || classPrefix"
                aria-role="alert"
            >
                <view :class="classPrefix + '__icon--left'">
                    <slot name="icon" />
                    <!-- parse <template v-if="_icon" is="icon" :data="tClass: prefix + '-class-icon', ariaHidden: true, ..._icon"/> -->
                    <block name="icon" v-if="false" v-if="_icon">
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
                            @click="bindclick || ''"
                        />
                    </block>
                </view>
                <view :class="classPrefix + '__text-wrap ' + (marquee ? classPrefix + '__text-nowrap' : '')" :style="'text-align: ' + align" :id="classPrefix + '__text-wrap'">
                    <view :class="classPrefix + '__text ' + prefix + '-class-content'" :id="classPrefix + '__text'" :animation="animation">
                        <block v-if="content">{{ content }}</block>
                        <slot name="content" />
                        <slot />
                    </view>
                </view>
                <t-link
                    v-if="_link && _link.content"
                    :class="classPrefix + '__link ' + prefix + '-class-link'"
                    :style="_._style([_link.style, _link.customStyle])"
                    :disabled="_link.disabled || false"
                    :hover="_link.hover || true"
                    :theme="_link.theme || 'primary'"
                    :size="_link.size || 'medium'"
                    :prefixIcon="_link.prefixIcon || false"
                    :suffixIcon="_link.suffixIcon || false"
                    :underline="_link.underline || false"
                    :content="_link.content || ''"
                    :navigatorProps="_link.navigatorProps || null"
                    @complete="handleLinkClick"
                />
                <slot name="link" />
                <view :class="classPrefix + '__icon--right'" @tap="handleClose">
                    <slot name="close-btn" />
                    <!-- parse <template v-if="_closeBtn" is="icon" :data="tClass: prefix + '-class-close-btn', ariaRole: 'button', ariaLabel: '关闭', ..._closeBtn"/> -->
                    <block name="icon" v-if="false" v-if="_closeBtn">
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
                            @click="bindclick || ''"
                        />
                    </block>
                </view>
            </view>
        </block>
    </view>
</template>
<script module="_this" lang="wxs" src="@/message-item/message-item.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tLink from "../link/link";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "../message/props";
import { getRect, unitConvert, calcIcon } from "../common/utils";
import { isObject } from "../common/validator";
const {
  prefix: prefix
} = config;
const name = `${prefix}-message`;
const THEME_ICON = {
  info: "info-circle-filled",
  success: "check-circle-filled",
  warning: "info-circle-filled",
  error: "error-circle-filled"
};
let Message = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-icon`, `${prefix}-class-link`, `${prefix}-class-close-btn`];
    this.options = {
      multipleSlots: true
    };
    this = Object.assign({}, props);
    this.setData({
      prefix: prefix,
      classPrefix: name,
      loop: -1,
      animation: [],
      showAnimation: [],
      wrapTop: -999,
      fadeClass: ""
    });
    this.closeTimeoutContext = 0;
    this.nextAnimationContext = 0;
    this.resetAnimation = uni.createAnimation({
      duration: 0,
      timingFunction: "linear"
    });
    this.observers = {
      marquee(t) {
        "{}" !== JSON.stringify(t) && "true" !== JSON.stringify(t) || this.setData({
          marquee: {
            speed: 50,
            loop: -1,
            delay: 0
          }
        });
      },
      "icon, theme"(t, e) {
        this.setData({
          _icon: calcIcon(t, THEME_ICON[e])
        });
      },
      link(t) {
        const e = isObject(t) ? Object.assign({}, t) : {
          content: t
        };
        this.setData({
          _link: e
        });
      },
      closeBtn(t) {
        this.setData({
          _closeBtn: calcIcon(t, "close")
        });
      }
    };
    this.lifetimes = {
      ready() {
        this.memoInitialData();
      },
      detached() {
        this.clearMessageAnimation();
      }
    };
  }
  memoInitialData() {
    this.initialData = Object.assign(Object.assign({}, this), this);
  }
  resetData(t) {
    this.setData(Object.assign({}, this.initialData), t);
  }
  checkAnimation() {
    const {
      marquee: t
    } = this;
    if (!t || 0 === t.loop) {
      return;
    }
    const e = t.speed;
    if (this.loop > 0) this.loop -= 1;else if (0 === this.loop) {
      return void this.setData({
        animation: this.resetAnimation.translateX(0).step().export()
      });
    }
    if (this.nextAnimationContext) {
      this.clearMessageAnimation();
    }
    const i = `#${name}__text-wrap`;
    const s = `#${name}__text`;
    Promise.all([getRect(this, s), getRect(this, i)]).then(([t, i]) => {
      this.setData({
        animation: this.resetAnimation.translateX(i.width).step().export()
      }, () => {
        const s = (t.width + i.width) / e * 1000;
        const a = uni.createAnimation({
          duration: s
        }).translateX(-t.width).step().export();
        setTimeout(() => {
          this.nextAnimationContext = setTimeout(this.checkAnimation.bind(this), s);
          this.setData({
            animation: a
          });
        }, 20);
      });
    });
  }
  clearMessageAnimation() {
    clearTimeout(this.nextAnimationContext);
    this.nextAnimationContext = 0;
  }
  show(t = 0) {
    const {
      duration: e,
      marquee: i,
      offset: s,
      id: a
    } = this;
    this.setData({
      visible: true,
      loop: i.loop || this.loop,
      fadeClass: `${name}__fade`,
      wrapTop: unitConvert(s[0]) + t
    });
    this.reset();
    this.checkAnimation();
    if (e && e > 0) {
      this.closeTimeoutContext = setTimeout(() => {
        this.hide();
        this.$emit("duration-end", {
          detail: {
            self: this
          }
        });
      }, e);
    }
    getRect(this, a ? `#${a}` : `#${name}`).then(t => {
      this.setData({
        height: t.height
      }, () => {
        this.setData({
          fadeClass: ""
        });
      });
    });
  }
  hide() {
    this.reset();
    this.setData({
      fadeClass: `${name}__fade`
    });
    setTimeout(() => {
      this.setData({
        visible: false,
        animation: []
      });
    }, 500);
    if ("function" == typeof this.onHide) {
      this.onHide();
    }
  }
  reset() {
    if (this.nextAnimationContext) {
      this.clearMessageAnimation();
    }
    clearTimeout(this.closeTimeoutContext);
    this.closeTimeoutContext = 0;
  }
  handleClose() {
    this.hide();
    this.$emit("close-btn-click");
  }
  handleLinkClick() {
    this.$emit("link-click");
  }
};
Message = __decorate([wxComponent()], Message);
export default Message;
</script>
<style>
@import './message-item.css';
@import 'undefined';
</style>
