<template>
    <view
        :id="tId"
        :style="_._style([style, customStyle])"
        :class="_.cls(classPrefix, [_placement, ['block', block]]) + ' class ' + prefix + '-class'"
        :disabled="_disabled"
        aria-role="radio"
        :aria-checked="checked"
        :aria-label="label + content"
        :aria-disabled="_disabled"
        :tabindex="tabindex"
        mut-bind:tap="handleTap"
    >
        <view :class="_.cls(classPrefix + '__icon', [_placement, ['checked', checked], ['disabled', _disabled]]) + ' ' + prefix + '-class-icon'">
            <slot name="icon" v-if="slotIcon" />
            <view v-else-if="customIcon" :class="classPrefix + '__image'"><image :src="checked ? iconVal[0] : iconVal[1]" :class="classPrefix + '-icon__image'" webp /></view>
            <block v-else>
                <t-icon v-if="checked && (icon == 'circle' || icon == 'line')" :name="icon == 'circle' ? 'check-circle-filled' : 'check'" :class="classPrefix + '__icon-wrap'" />
                <view v-if="checked && icon == 'dot'" :class="_.cls(classPrefix + '__icon-' + icon, [['disabled', _disabled]])" />
                <view v-if="!checked && (icon == 'circle' || icon == 'dot')" :class="_.cls(classPrefix + '__icon-circle', [['disabled', _disabled]])" />
                <view v-if="!checked && icon == 'line'" class="placeholder"></view>
            </block>
        </view>
        <view :class="classPrefix + '__content'" data-target="text" mut-bind:tap="handleTap">
            <view
                :class="
                    _.cls(classPrefix + '__title', [
                        ['disabled', _disabled],
                        ['checked', checked]
                    ]) +
                    ' ' +
                    prefix +
                    '-class-label'
                "
                :style="'-webkit-line-clamp:' + maxLabelRow"
            >
                <block v-if="label">{{ label }}</block>
                <slot />
                <slot name="label" />
            </view>
            <view
                :class="
                    _.cls(classPrefix + '__description', [
                        ['disabled', _disabled],
                        ['checked', checked]
                    ]) +
                    ' ' +
                    prefix +
                    '-class-content'
                "
                :style="'-webkit-line-clamp:' + maxContentRow"
            >
                <block v-if="content">{{ content }}</block>
                <slot name="content" />
            </view>
        </view>
        <view v-if="!borderless" :class="_.cls(classPrefix + '__border', [_placement]) + ' ' + prefix + '-class-border'" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import config from "../common/config";
import { SuperComponent, wxComponent } from "../common/src/index";
import Props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-radio`;
let Radio = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-label`, `${prefix}-class-icon`, `${prefix}-class-content`, `${prefix}-class-border`];
    this.behaviors = ["wx://form-field"];
    this.relations = {
      "../radio-group/radio-group": {
        type: "ancestor",
        linked(e) {
          if (e.data.borderless) {
            this.setData({
              borderless: true
            });
          }
        }
      }
    };
    this.options = {
      multipleSlots: true
    };
    this.lifetimes = {
      attached() {
        this.init();
      }
    };
    this = Object.assign(Object.assign({}, Props), {
      borderless: {
        type: Boolean,
        value: false
      },
      tId: {
        type: String
      }
    });
    this.controlledProps = [{
      key: "checked",
      event: "change"
    }];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      customIcon: false,
      slotIcon: false,
      optionLinked: false,
      iconVal: [],
      _placement: "",
      _disabled: false,
      _readonly: false
    });
    this.observers = {
      disabled(e) {
        this.setData({
          _disabled: e
        });
      },
      readonly(e) {
        this.setData({
          _readonly: e
        });
      }
    };
    this.methods = {
      handleTap(e) {
        const {
          _disabled: t,
          _readonly: a,
          contentDisabled: o
        } = this;
        const {
          target: s
        } = e.currentTarget.dataset;
        t || a || "text" === s && o || this.doChange();
      },
      doChange() {
        var e;
        const {
          value: t,
          checked: a,
          allowUncheck: o
        } = this;
        const s = Boolean(o || (null === (e = this.$parent) || void 0 === e ? void 0 : e.data.allowUncheck));
        this.$parent ? this.$parent.updateValue(a && s ? null : t) : this._trigger("change", {
          checked: !s || !a
        });
      },
      init() {
        var e;
        var t;
        var a;
        var o;
        const {
          icon: s
        } = this;
        const i = Array.isArray((null === (e = this.$parent) || void 0 === e ? void 0 : e.icon) || s);
        this.setData({
          customIcon: i,
          slotIcon: "slot" === s,
          iconVal: i ? (null === (t = this.$parent) || void 0 === t ? void 0 : t.icon) || s : [],
          _placement: this.placement || (null === (o = null === (a = this.$parent) || void 0 === a ? void 0 : a.data) || void 0 === o ? void 0 : o.placement) || "left"
        });
      },
      setDisabled(e) {
        this.setData({
          _disabled: this.disabled || e
        });
      },
      setReadonly(e) {
        this.setData({
          _readonly: this.readonly || e
        });
      }
    };
  }
};
Radio = __decorate([wxComponent()], Radio);
export default Radio;
</script>
<style>
@import './radio.css';
</style>
