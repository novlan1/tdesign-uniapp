<template>
    <view
        :style="_._style([style, customStyle])"
        :class="'class ' + prefix + '-class ' + _.cls(classPrefix, [['fixed', fixed], theme])"
        @tap="toTop"
        aria-role="button"
        v-if="!hidden"
    >
        <view :class="classPrefix + '__icon'" aria-hidden>
            <slot name="icon" />
            <!-- parse <template v-if="_icon" is="icon" :data="tClass: prefix + '-class-icon', ..._icon"/> -->
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
                    @click="'handleClose' || ''"
                />
            </block>
        </view>
        <view v-if="!!text" :class="classPrefix + '__text--' + theme + ' ' + prefix + '-class-text'">{{ text }}</view>
        <slot />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { calcIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-back-top`;
let BackTop = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-text`];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.relations = {
      "../pull-down-refresh/pull-down-refresh": {
        type: "ancestor"
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      _icon: null,
      hidden: true
    });
    this.observers = {
      icon() {
        this.setIcon();
      },
      scrollTop(o) {
        const {
          visibilityHeight: t
        } = this;
        this.setData({
          hidden: o < t
        });
      }
    };
    this.lifetimes = {
      ready() {
        const {
          icon: o
        } = this;
        this.setIcon(o);
      }
    };
    this.methods = {
      setIcon(o) {
        this.setData({
          _icon: calcIcon(o, "backtop")
        });
      },
      toTop() {
        var o;
        this.$emit("to-top");
        if (this.$parent) {
          null === (o = this.$parent) || void 0 === o || o.setScrollTop(0);
          this.setData({
            hidden: true
          });
        } else {
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 300
          });
        }
      }
    };
  }
};
BackTop = __decorate([wxComponent()], BackTop);
export default BackTop;
</script>
<style>
@import './back-top.css';
@import 'undefined';
</style>
