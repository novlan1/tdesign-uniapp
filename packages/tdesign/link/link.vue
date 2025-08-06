<template>
    <view>
        <navigator
            :class="className + ' class ' + prefix + '-class'"
            :style="_._style([style, customStyle])"
            :target="navigatorProps.target"
            :url="!disabled && navigatorProps.url"
            :open-type="navigatorProps.openType || 'navigate'"
            :delta="navigatorProps.delta"
            :app-id="navigatorProps.appId"
            :path="navigatorProps.path"
            :extra-data="navigatorProps.extraData"
            :version="navigatorProps.version"
            :short-link="navigatorProps.shortLink"
            :hover-class="(hover && !disabled && classPrefix + '--hover') + ' ' + prefix + '-class-hover ' + navigatorProps.hoverClass"
            hover-stop-propagation="navigatorProps.hoverStopPropagation"
            :hover-start-time="navigatorProps.hoverStartTime"
            :hover-stay-time="navigatorProps.hoverStayTime"
            @success="onSuccess"
            @fail="onFail"
            @complete="onComplete"
            :aria-disabled="disabled"
        >
            <view :class="classPrefix + '__prefix-icon ' + prefix + '-class-prefix-icon'">
                <slot name="prefix-icon" />
                <!-- parse <template v-if="_prefixIcon" is="icon" :data="tClass: prefix + '-class-prefix-icon', ariaHidden: true, ..._prefixIcon"/> -->
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
            <view :class="classPrefix + '__content ' + prefix + '-class-content'">
                <block v-if="content">{{ content }}</block>
                <slot name="content" />
                <slot />
            </view>
            <view :class="classPrefix + '__suffix-icon ' + prefix + '-class-suffix-icon'">
                <slot name="suffix-icon" />
                <!-- parse <template v-if="_suffixIcon" is="icon" :data="tClass: prefix + '-class-suffix-icon', ariaHidden: true, ..._suffixIcon"/> -->
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
        </navigator>
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
const name = `${prefix}-link`;
let Link = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-hover`, `${prefix}-class-prefix-icon`, `${prefix}-class-content`, `${prefix}-class-suffix-icon`];
    this = props;
    this.options = {
      multipleSlots: true
    };
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.observers = {
      "theme, disabled, size, underline, navigatorProps"() {
        this.setClass();
      },
      prefixIcon(e) {
        this.setData({
          _prefixIcon: calcIcon(e)
        });
      },
      suffixIcon(e) {
        this.setData({
          _suffixIcon: calcIcon(e)
        });
      }
    };
    this.lifetimes = {
      attached() {
        this.setClass();
      }
    };
    this.methods = {
      setClass() {
        const {
          theme: e,
          size: s,
          underline: i,
          navigatorProps: t,
          disabled: o
        } = this;
        const n = [name, `${name}--${e}`, `${name}--${s}`];
        const {
          url: r,
          appId: a,
          shortLink: p,
          target: c,
          openType: l
        } = null != t ? t : {};
        const m = !(r || "miniProgram" === c && (a || p));
        if (i) {
          n.push(`${name}--underline`);
        }
        if (t && m && !["navigateBack", "exit"].includes(l) || o) {
          n.push(`${name}--disabled`);
        }
        this.setData({
          className: n.join(" ")
        });
      },
      onSuccess(e) {
        this.$emit("success", {
          detail: e
        });
      },
      onFail(e) {
        this.$emit("fail", {
          detail: e
        });
      },
      onComplete(e) {
        this.$emit("complete", {
          detail: e
        });
      }
    };
  }
};
Link = __decorate([wxComponent()], Link);
export default Link;
</script>
<style>
@import './link.css';
@import 'undefined';
</style>
