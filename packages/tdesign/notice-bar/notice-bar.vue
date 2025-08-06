<template>
    <view v-if="visible" :style="_._style([style, customStyle])" :class="classPrefix + ' ' + classPrefix + '--' + theme + ' class ' + prefix + '-class'">
        <view :class="classPrefix + '__prefix-icon'" @tap="clickPrefixIcon">
            <slot name="prefix-icon" />
            <!-- parse <template v-if="_prefixIcon" is="icon" :data="tClass: prefix + '-class-prefix-icon', ..._prefixIcon"></template> -->
            <block name="icon" v-if="false" v-if="_prefixIcon">
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
        <view :class="classPrefix + '__content-wrap'" @tap="clickContent">
            <view v-if="direction === 'vertical' && _.isArray(content)">
                <swiper
                    :autoplay="true"
                    :vertical="true"
                    :circular="true"
                    :interval="interval"
                    display-multiple-items="1"
                    :class="classPrefix + '__content ' + classPrefix + '__content--vertical'"
                    @change="onChange"
                >
                    <block v-for="(item, index) in content" :key="index">
                        <swiper-item>
                            <view :class="classPrefix + '__content--vertical-item'">{{ item }}</view>
                        </swiper-item>
                    </block>
                </swiper>
            </view>
            <view v-else :class="classPrefix + '__content ' + prefix + '-class-content ' + (!marquee ? classPrefix + '__content-wrapable' : '')" :animation="animationData">
                <block v-if="content">{{ content }}</block>
                <slot name="content" />
                <view :class="classPrefix + '__operation ' + prefix + '-class-operation'" @tap.stop.prevent="clickOperation">
                    <block v-if="operation">{{ operation }}</block>
                    <slot name="operation" />
                </view>
            </view>
        </view>
        <view :class="classPrefix + '__suffix-icon'" @tap="clickSuffixIcon">
            <slot name="suffix-icon" />
            <!-- parse <template v-if="_suffixIcon" is="icon" :data="tClass: prefix + '-class-suffix-icon', ..._suffixIcon"></template> -->
            <block name="icon" v-if="false" v-if="_suffixIcon">
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
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import { getRect, getAnimationFrame, calcIcon } from "../common/utils";
import props from "./props";
import config from "../common/config";
const {
  prefix: prefix
} = config;
const name = `${prefix}-notice-bar`;
const THEME_ICON = {
  info: "info-circle-filled",
  success: "check-circle-filled",
  warning: "info-circle-filled",
  error: "error-circle-filled"
};
let NoticeBar = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-prefix-icon`, `${prefix}-class-operation`, `${prefix}-class-suffix-icon`];
    this.options = {
      multipleSlots: true,
      pureDataPattern: /^__/
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      loop: -1,
      __ready: false
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
      visible(t) {
        if (this.__ready) {
          if (t) {
            this.show();
          } else {
            this.clearNoticeBarAnimation();
          }
        }
      },
      prefixIcon(t) {
        this.setPrefixIcon(t);
      },
      suffixIcon(t) {
        this.setData({
          _suffixIcon: calcIcon(t)
        });
      },
      content() {
        if (this.__ready) {
          this.clearNoticeBarAnimation();
          this.initAnimation();
        }
      }
    };
    this.lifetimes = {
      created() {
        this.resetAnimation = uni.createAnimation({
          duration: 0,
          timingFunction: "linear"
        });
      },
      detached() {
        this.clearNoticeBarAnimation();
      },
      ready() {
        this.show();
        this.setData({
          __ready: true
        });
      }
    };
    this.methods = {
      initAnimation() {
        const t = `.${name}__content-wrap`;
        const i = `.${name}__content`;
        getAnimationFrame(this, () => {
          Promise.all([getRect(this, i), getRect(this, t)]).then(([t, i]) => {
            const {
              marquee: e
            } = this;
            if (null != t && null != i && t.width && i.width && false !== e && (e || i.width < t.width)) {
              const n = e.speed || 50;
              const o = e.delay || 0;
              const a = (i.width + t.width) / n * 1000;
              const r = t.width / n * 1000;
              this.setData({
                wrapWidth: Number(i.width),
                nodeWidth: Number(t.width),
                animationDuration: a,
                delay: o,
                loop: e.loop - 1,
                firstAnimationDuration: r
              });
              if (0 !== e.loop) {
                this.startScrollAnimation(true);
              }
            }
          }).catch(() => {});
        });
      },
      startScrollAnimation(t = false) {
        this.clearNoticeBarAnimation();
        const {
          wrapWidth: i,
          nodeWidth: e,
          firstAnimationDuration: n,
          animationDuration: o,
          delay: a
        } = this;
        const r = t ? a : 0;
        const s = t ? n : o;
        this.setData({
          animationData: this.resetAnimation.translateX(t ? 0 : i).step().export()
        });
        getAnimationFrame(this, () => {
          this.setData({
            animationData: uni.createAnimation({
              duration: s,
              timingFunction: "linear",
              delay: r
            }).translateX(-e).step().export()
          });
        });
        this.nextAnimationContext = setTimeout(() => {
          this.loop > 0 ? (this.loop -= 1, this.startScrollAnimation()) : 0 === this.loop ? this.setData({
            animationData: this.resetAnimation.translateX(0).step().export()
          }) : this.loop < 0 && this.startScrollAnimation();
        }, s + r);
      },
      show() {
        this.clearNoticeBarAnimation();
        this.setPrefixIcon(this.prefixIcon);
        this.initAnimation();
      },
      clearNoticeBarAnimation() {
        if (this.nextAnimationContext) {
          clearTimeout(this.nextAnimationContext);
        }
        this.nextAnimationContext = null;
      },
      setPrefixIcon(t) {
        const {
          theme: i
        } = this;
        this.setData({
          _prefixIcon: calcIcon(t, THEME_ICON[i])
        });
      },
      onChange(t) {
        const {
          current: i,
          source: e
        } = t.detail;
        this.$emit("change", {
          detail: {
            current: i,
            source: e
          }
        });
      },
      clickPrefixIcon() {
        this.$emit("click", {
          detail: {
            trigger: "prefix-icon"
          }
        });
      },
      clickContent() {
        this.$emit("click", {
          detail: {
            trigger: "content"
          }
        });
      },
      clickSuffixIcon() {
        this.$emit("click", {
          detail: {
            trigger: "suffix-icon"
          }
        });
      },
      clickOperation() {
        this.$emit("click", {
          detail: {
            trigger: "operation"
          }
        });
      }
    };
  }
};
NoticeBar = __decorate([wxComponent()], NoticeBar);
export default NoticeBar;
</script>
<style>
@import './notice-bar.css';
@import 'undefined';
</style>
