<template>
    <view :class="className + ' class ' + prefix + '-class'" :style="_._style([tagStyle, style, customStyle])" @tap="handleClick">
        <view :aria-hidden="true" :class="classPrefix + '__icon'">
            <!-- parse <template v-if="_icon" is="icon" :data="tClass: prefix + '-icon', ..._icon"/> -->
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
            <slot name="icon" />
        </view>
        <view :class="classPrefix + '__text'"><slot /></view>
        <!-- parse <template v-if="_closable" is="icon" :data="tClass: classPrefix + '__icon-close ' + prefix + '-icon', bindclick: 'handleClose',  ariaRole: 'button', ariaLabel: '关闭',  ..._closable" @tap.native.stop.prevent="handleClose"/> -->
        <block name="icon" v-if="false" v-if="_closable" @tap.native.stop.prevent="handleClose">
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
        <slot v-else name="closable" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from ".././icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { classNames, calcIcon } from "../common/utils";
import { isNumber } from "../common/validator";
const {
  prefix: prefix
} = config;
const name = `${prefix}-tag`;
let Tag = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.setData({
      prefix: prefix,
      classPrefix: name,
      className: "",
      tagStyle: ""
    });
    this = props;
    this.externalClasses = [`${prefix}-class`];
    this.options = {
      multipleSlots: true
    };
    this.lifetimes = {
      attached() {
        this.setClass();
        this.setTagStyle();
      }
    };
    this.observers = {
      "size, shape, theme, variant, closable, disabled"() {
        this.setClass();
      },
      maxWidth() {
        this.setTagStyle();
      },
      icon(s) {
        this.setData({
          _icon: calcIcon(s)
        });
      },
      closable(s) {
        this.setData({
          _closable: calcIcon(s, "close")
        });
      }
    };
    this.methods = {
      setClass() {
        const {
          prefix: s,
          classPrefix: t
        } = this;
        const {
          size: e,
          shape: a,
          theme: i,
          variant: o,
          closable: l,
          disabled: r
        } = this;
        const c = classNames([t, `${t}--${i || "default"}`, `${t}--${o}`, l ? `${t}--closable ${s}-is-closable` : "", r ? `${t}--disabled ${s}-is-disabled` : "", `${t}--${e}`, `${t}--${a}`]);
        this.setData({
          className: c
        });
      },
      setTagStyle() {
        const {
          maxWidth: s
        } = this;
        if (!s) {
          return "";
        }
        const t = isNumber(s) ? `${s}px` : s;
        this.setData({
          tagStyle: `max-width:${t};`
        });
      },
      handleClick(s) {
        this.disabled || this.$emit("click", {
          detail: s
        });
      },
      handleClose(s) {
        this.disabled || this.$emit("close", {
          detail: s
        });
      }
    };
  }
};
Tag = __decorate([wxComponent()], Tag);
export default Tag;
</script>
<style>
@import './tag.css';
@import 'undefined';
</style>
