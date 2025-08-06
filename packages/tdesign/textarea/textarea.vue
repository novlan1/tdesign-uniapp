<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' ' + (bordered ? classPrefix + '--border' : '') + ' class ' + prefix + '-class'">
        <view :class="classPrefix + '__label ' + prefix + '-class-label'">
            <block v-if="label">{{ label }}</block>
            <slot name="label" />
        </view>
        <view :class="classPrefix + '__wrapper'">
            <textarea
                :class="classPrefix + '__wrapper-inner ' + (disabled ? prefix + '-is-disabled' : '') + ' ' + prefix + '-class-textarea'"
                :style="_this.textareaStyle(autosize)"
                :maxlength="allowInputOverMax ? -1 : maxlength"
                :disabled="disabled || readonly"
                :placeholder="placeholder"
                :placeholder-class="classPrefix + '__placeholder ' + placeholderClass"
                :placeholder-style="placeholderStyle"
                :value="value"
                :auto-height="!!autosize"
                :auto-focus="autofocus"
                :fixed="fixed"
                :focus="focus"
                :cursor="cursor"
                :cursor-spacing="cursorSpacing"
                :adjust-position="adjustPosition"
                :confirm-type="confirmType"
                :confirm-hold="confirmHold"
                :disable-default-padding="disableDefaultPadding"
                :show-confirm-bar="showConfirmBar"
                :selection-start="selectionStart"
                :selection-end="selectionEnd"
                :hold-keyboard="holdKeyboard"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                @confirm="onConfirm"
                @linechange="onLineChange"
                @keyboardheightchange="onKeyboardHeightChange"
            />
            <view v-if="indicator && (maxcharacter > 0 || maxlength > 0)" :class="classPrefix + '__indicator ' + prefix + '-class-indicator'">
                {{ count }} / {{ maxcharacter || maxlength }}
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/textarea/textarea.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getCharacterLength } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-textarea`;
let Textarea = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.behaviors = ["wx://form-field"];
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-textarea`, `${prefix}-class-label`, `${prefix}-class-indicator`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      count: 0
    });
    this.observers = {
      value(e) {
        this.updateCount(null != e ? e : this.defaultValue);
      }
    };
    this.lifetimes = {
      ready() {
        var e;
        const {
          value: t,
          defaultValue: a
        } = this;
        this.updateValue(null !== (e = null != t ? t : a) && void 0 !== e ? e : "");
      }
    };
    this.methods = {
      updateCount(e) {
        const {
          maxcharacter: t,
          maxlength: a
        } = this;
        const {
          count: r
        } = this.calculateValue(e, t, a);
        this.setData({
          count: r
        });
      },
      updateValue(e) {
        const {
          maxcharacter: t,
          maxlength: a
        } = this;
        const {
          value: r,
          count: s
        } = this.calculateValue(e, t, a);
        this.setData({
          value: r,
          count: s
        });
      },
      calculateValue(e, t, a) {
        const {
          allowInputOverMax: r
        } = this;
        if (t > 0 && !Number.isNaN(t)) {
          const {
            length: a,
            characters: s
          } = getCharacterLength("maxcharacter", e, r ? 1 / 0 : t);
          return {
            value: s,
            count: a
          };
        }
        if (a > 0 && !Number.isNaN(a)) {
          const {
            length: t,
            characters: s
          } = getCharacterLength("maxlength", e, r ? 1 / 0 : a);
          return {
            value: s,
            count: t
          };
        }
        return {
          value: e,
          count: e ? String(e).length : 0
        };
      },
      onInput(e) {
        const {
          value: t,
          cursor: a
        } = e.detail;
        this.updateValue(t);
        this.$emit("change", {
          detail: {
            value: this.value,
            cursor: a
          }
        });
      },
      onFocus(e) {
        this.$emit("focus", {
          detail: Object.assign({}, e.detail)
        });
      },
      onBlur(e) {
        this.$emit("blur", {
          detail: Object.assign({}, e.detail)
        });
      },
      onConfirm(e) {
        this.$emit("enter", {
          detail: Object.assign({}, e.detail)
        });
      },
      onLineChange(e) {
        this.$emit("line-change", {
          detail: Object.assign({}, e.detail)
        });
      },
      onKeyboardHeightChange(e) {
        this.$emit("keyboardheightchange", {
          detail: e.detail
        });
      }
    };
  }
};
Textarea = __decorate([wxComponent()], Textarea);
export default Textarea;
</script>
<style>
@import './textarea.css';
</style>
