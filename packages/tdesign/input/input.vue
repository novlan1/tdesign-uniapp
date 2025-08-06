<template>
    <view
        :style="_._style([style, customStyle])"
        :class="_.cls(classPrefix, [['border', !borderless]]) + ' ' + classPrefix + '--layout-' + layout + ' class ' + prefix + '-class'"
        aria-describedby
    >
        <view :class="classPrefix + '__wrap--prefix'">
            <view :class="classPrefix + '__icon--prefix'">
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
                        :aria-label="ariaLabel || ''"
                        :aria-role="ariaRole || ''"
                        @click="bindclick || ''"
                    />
                </block>
            </view>
            <view :class="classPrefix + '__label ' + prefix + '-class-label'" aria-hidden>
                <slot name="label" />
                <block v-if="label">{{ label }}</block>
            </view>
        </view>
        <view :class="classPrefix + '__wrap'">
            <view :class="classPrefix + '__content ' + classPrefix + '--' + status">
                <input
                    :class="_this.getInputClass(classPrefix, suffix, align, disabled) + ' ' + prefix + '-class-input'"
                    :maxlength="allowInputOverMax ? -1 : maxlength"
                    :disabled="disabled || readonly"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="_.cls(classPrefix + '__placeholder', [['disabled', disabled]]) + ' ' + placeholderClass"
                    :value="value"
                    :password="type === 'password'"
                    :type="type === 'password' ? 'text' : type"
                    :focus="focus"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :cursor="cursor"
                    :cursor-color="cursorColor"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :auto-focus="autoFocus"
                    :always-embed="alwaysEmbed"
                    :selection-start="selectionStart"
                    :selection-end="selectionEnd"
                    :hold-keyboard="holdKeyboard"
                    :safe-password-cert-path="safePasswordCertPath"
                    :safe-password-length="safePasswordLength"
                    :safe-password-time-stamp="safePasswordTimeStamp"
                    :safe-password-nonce="safePasswordNonce"
                    :safe-password-salt="safePasswordSalt"
                    :safe-password-custom-hash="safePasswordCustomHash"
                    aria-role="textbox"
                    :aria-label="label"
                    :aria-roledescription="label"
                    @input="onInput"
                    @focus="onFocus"
                    @blur="onBlur"
                    @confirm="onConfirm"
                    @keyboardheightchange="onKeyboardHeightChange"
                    @nicknamereview="onNickNameReview"
                />
                <view v-if="_clearIcon && value.length > 0 && showClearIcon" :class="classPrefix + '__wrap--clearable-icon'" @tap="clearInput">
                    <!-- parse <template is="icon" :data="tClass: prefix + '-class-clearable', ariaRole: 'button', ariaLabel: '清除', ..._clearIcon"/> -->
                    <block name="icon" v-if="false">
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
                <view :class="classPrefix + '__wrap--suffix ' + prefix + '-class-suffix'" @tap="onSuffixClick">
                    <text v-if="suffix">{{ suffix }}</text>
                    <slot name="suffix" />
                </view>
                <view :class="classPrefix + '__wrap--suffix-icon'" @tap="onSuffixIconClick">
                    <slot name="suffix-icon" />
                    <!-- parse <template v-if="_suffixIcon" is="icon" :data="tClass: prefix + '-class-suffix-icon', ariaRole: 'button', ..._suffixIcon"/> -->
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
            <view v-if="tips && tips.length > 0" :class="classPrefix + '__tips ' + classPrefix + '--' + align + ' ' + prefix + '-class-tips'">{{ tips }}</view>
            <slot name="tips" />
        </view>
        <slot name="extra" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/input/input.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getCharacterLength, calcIcon } from "../common/utils";
import { isDef } from "../common/validator";
const {
  prefix: prefix
} = config;
const name = `${prefix}-input`;
let Input = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-prefix-icon`, `${prefix}-class-label`, `${prefix}-class-input`, `${prefix}-class-clearable`, `${prefix}-class-suffix`, `${prefix}-class-suffix-icon`, `${prefix}-class-tips`];
    this.behaviors = ["wx://form-field"];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      classBasePrefix: prefix,
      showClearIcon: true
    });
    this.lifetimes = {
      ready() {
        var e;
        const {
          value: t,
          defaultValue: i
        } = this;
        this.updateValue(null !== (e = null != t ? t : i) && void 0 !== e ? e : "");
      }
    };
    this.observers = {
      prefixIcon(e) {
        this.setData({
          _prefixIcon: calcIcon(e)
        });
      },
      suffixIcon(e) {
        this.setData({
          _suffixIcon: calcIcon(e)
        });
      },
      clearable(e) {
        this.setData({
          _clearIcon: calcIcon(e, "close-circle-filled")
        });
      },
      "clearTrigger, clearable, disabled, readonly"() {
        this.updateClearIconVisible();
      }
    };
    this.methods = {
      updateValue(e) {
        const {
          allowInputOverMax: t,
          maxcharacter: i,
          maxlength: r
        } = this;
        if (!t && i && i > 0 && !Number.isNaN(i)) {
          const {
            length: t,
            characters: r
          } = getCharacterLength("maxcharacter", e, i);
          this.setData({
            value: r,
            count: t
          });
        } else if (!t && r && r > 0 && !Number.isNaN(r)) {
          const {
            length: t,
            characters: i
          } = getCharacterLength("maxlength", e, r);
          this.setData({
            value: i,
            count: t
          });
        } else {
          this.setData({
            value: e,
            count: isDef(e) ? String(e).length : 0
          });
        }
      },
      updateClearIconVisible(e = false) {
        const {
          clearTrigger: t,
          disabled: i,
          readonly: r
        } = this;
        i || r ? this.setData({
          showClearIcon: false
        }) : this.setData({
          showClearIcon: e || "always" === t
        });
      },
      onInput(e) {
        const {
          value: t,
          cursor: i,
          keyCode: r
        } = e.detail;
        this.updateValue(t);
        this.$emit("change", {
          detail: {
            value: this.value,
            cursor: i,
            keyCode: r
          }
        });
      },
      onFocus(e) {
        this.updateClearIconVisible(true);
        this.$emit("focus", {
          detail: e.detail
        });
      },
      onBlur(e) {
        this.updateClearIconVisible();
        if ("function" == typeof this.format) {
          const t = this.format(e.detail.value);
          this.updateValue(t);
          return void this.$emit("blur", {
            detail: {
              value: this.value,
              cursor: this.count
            }
          });
        }
        this.$emit("blur", {
          detail: e.detail
        });
      },
      onConfirm(e) {
        this.$emit("enter", {
          detail: e.detail
        });
      },
      onSuffixClick() {
        this.$emit("click", {
          detail: {
            trigger: "suffix"
          }
        });
      },
      onSuffixIconClick() {
        this.$emit("click", {
          detail: {
            trigger: "suffix-icon"
          }
        });
      },
      clearInput(e) {
        this.$emit("clear", {
          detail: e.detail
        });
        this.setData({
          value: ""
        });
      },
      onKeyboardHeightChange(e) {
        this.$emit("keyboardheightchange", {
          detail: e.detail
        });
      },
      onNickNameReview(e) {
        this.$emit("nicknamereview", {
          detail: e.detail
        });
      }
    };
  }
};
Input = __decorate([wxComponent()], Input);
export default Input;
</script>
<style>
@import './input.css';
@import 'undefined';
</style>
