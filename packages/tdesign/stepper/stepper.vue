<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' ' + classPrefix + '--' + size + ' class ' + prefix + '-class'">
        <view
            :class="
                classPrefix +
                '__minus ' +
                classPrefix +
                '__minus--' +
                theme +
                ' ' +
                classPrefix +
                '__icon--' +
                size +
                ' ' +
                (disabled || disableMinus || currentValue <= min ? classPrefix + '--' + theme + '-disabled' : '') +
                ' ' +
                prefix +
                '-class-minus'
            "
            @tap.stop.prevent="minusValue"
            :aria-label="'减少' + step"
            aria-role="button"
            :aria-disabled="disabled || disableMinus || currentValue <= min"
        >
            <t-icon name="remove" />
        </view>
        <view :class="classPrefix + '__input--' + theme + ' ' + (disabled || disableInput ? classPrefix + '--' + theme + '-disabled' : '')">
            <input
                :style="inputWidth ? 'width:' + inputWidth + 'px;' : ''"
                :class="classPrefix + '__input ' + classPrefix + '__input--' + size + ' ' + prefix + '-class-input'"
                :disabled="disabled || disableInput"
                :type="integer ? 'number' : 'digit'"
                :value="currentValue"
                @input.stop.prevent="handleInput"
                @focus.stop.prevent="handleFocus"
                @blur.stop.prevent="handleBlur"
            />
        </view>
        <view
            :class="
                classPrefix +
                '__plus ' +
                classPrefix +
                '__plus--' +
                theme +
                ' ' +
                classPrefix +
                '__icon--' +
                size +
                ' ' +
                (disabled || disablePlus || currentValue >= max ? classPrefix + '--' + theme + '-disabled' : '') +
                ' ' +
                prefix +
                '-class-plus'
            "
            @tap.stop.prevent="plusValue"
            :aria-label="'增加' + step"
            aria-role="button"
            :aria-disabled="disabled || disablePlus || currentValue >= max"
        >
            <t-icon name="add" />
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tCell from "../cell/cell";
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-stepper`;
let Stepper = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-input`, `${prefix}-class-minus`, `${prefix}-class-plus`];
    this = Object.assign({}, props);
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      value(e) {
        this.preValue = Number(e);
        this.setData({
          currentValue: this.format(Number(e))
        });
      }
    };
    this.setData({
      currentValue: 0,
      classPrefix: name,
      prefix: prefix
    });
    this.lifetimes = {
      attached() {
        const {
          value: e,
          min: t
        } = this;
        this.setData({
          currentValue: e ? Number(e) : t
        });
      }
    };
    this.methods = {
      isDisabled(e) {
        const {
          min: t,
          max: s,
          disabled: r
        } = this;
        const {
          currentValue: i
        } = this;
        return !!r || "minus" === e && i <= t || "plus" === e && i >= s;
      },
      getLen(e) {
        const t = e.toString();
        return -1 === t.indexOf(".") ? 0 : t.split(".")[1].length;
      },
      add(e, t) {
        const s = Math.max(this.getLen(e), this.getLen(t));
        const r = Math.pow(10, s);
        return Math.round(e * r + t * r) / r;
      },
      format(e) {
        const {
          min: t,
          max: s,
          step: r
        } = this;
        const i = Math.max(this.getLen(r), this.getLen(e));
        return Math.max(Math.min(s, e, Number.MAX_SAFE_INTEGER), t, Number.MIN_SAFE_INTEGER).toFixed(i);
      },
      setValue(e) {
        e = this.format(e);
        if (this.preValue !== e) {
          this.preValue = e;
          this._trigger("change", {
            value: Number(e)
          });
        }
      },
      minusValue() {
        if (this.isDisabled("minus")) {
          this.$emit("overlimit", {
            detail: {
              type: "minus"
            }
          });
          return false;
        }
        const {
          currentValue: e,
          step: t
        } = this;
        this.setValue(this.add(e, -t));
      },
      plusValue() {
        if (this.isDisabled("plus")) {
          this.$emit("overlimit", {
            detail: {
              type: "plus"
            }
          });
          return false;
        }
        const {
          currentValue: e,
          step: t
        } = this;
        this.setValue(this.add(e, t));
      },
      filterIllegalChar(e) {
        const t = String(e).replace(/[^0-9.]/g, "");
        const s = t.indexOf(".");
        return this.integer && -1 !== s ? t.split(".")[0] : this.integer || -1 === s || s === t.lastIndexOf(".") ? t : t.split(".", 2).join(".");
      },
      handleFocus(e) {
        const {
          value: t
        } = e.detail;
        this.$emit("focus", {
          detail: {
            value: t
          }
        });
      },
      handleInput(e) {
        const {
          value: t
        } = e.detail;
        if ("" === t) {
          return;
        }
        const s = this.filterIllegalChar(t);
        this.setData({
          currentValue: s
        });
        this.$emit("input", {
          detail: {
            value: s
          }
        });
      },
      handleBlur(e) {
        const {
          value: t
        } = e.detail;
        const s = this.format(t);
        this.setValue(s);
        this.$emit("blur", {
          detail: {
            value: s
          }
        });
      }
    };
  }
};
Stepper = __decorate([wxComponent()], Stepper);
export default Stepper;
</script>
<style>
@import './stepper.css';
</style>
