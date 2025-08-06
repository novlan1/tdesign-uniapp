<template>
    <view :style="_._style([style, customStyle])" :class="className + ' class ' + prefix + '-class'" @tap="onClick">
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
                    @click="'handleClose' || ''"
                />
            </block>
            <slot name="icon" />
        </view>
        <view :class="classPrefix + '__text'">
            <slot />
            <slot name="content" />
            <block v-if="_.isArray(content) && content.length == 2">{{ checked ? content[0] : content[1] }}</block>
            <block v-else>{{ content }}</block>
        </view>
        <t-icon
            v-if="closable"
            :class="classPrefix + '__icon-close'"
            :t-class="prefix + '-icon'"
            @tap.native.stop.prevent="onClose"
            name="close"
            aria-role="button"
            aria-label="关闭"
        />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { classNames, calcIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-tag`;
let CheckTag = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.setData({
      prefix: prefix,
      classPrefix: name,
      className: ""
    });
    this = props;
    this.externalClasses = [`${prefix}-class`];
    this.controlledProps = [{
      key: "checked",
      event: "change"
    }];
    this.options = {
      multipleSlots: true
    };
    this.lifetimes = {
      attached() {
        this.setClass();
      }
    };
    this.observers = {
      "size, disabled, checked"() {
        this.setClass();
      },
      icon(e) {
        this.setData({
          _icon: calcIcon(e)
        });
      }
    };
    this.methods = {
      setClass() {
        const {
          classPrefix: e
        } = this;
        const {
          size: s,
          variant: t,
          disabled: i,
          checked: a,
          shape: c
        } = this;
        const o = classNames([e, `${e}--checkable`, i ? `${e}--disabled` : "", a ? `${e}--checked` : "", `${e}--${a ? "primary" : "default"}`, `${e}--${s}`, `${e}--${t}`, `${e}--${c}`]);
        this.setData({
          className: o
        });
      },
      onClick() {
        if (this.disabled) {
          return;
        }
        const {
          checked: e
        } = this;
        this._trigger("click");
        this._trigger("change", {
          checked: !e
        });
      },
      onClose(e) {
        this.disabled || this._trigger("close", e);
      }
    };
  }
};
CheckTag = __decorate([wxComponent()], CheckTag);
export default CheckTag;
</script>
<style>
@import './check-tag.css';
@import 'undefined';
</style>
