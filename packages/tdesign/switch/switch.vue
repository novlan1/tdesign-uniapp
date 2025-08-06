<template>
    <view
        :style="_._style([style, customStyle])"
        :class="'class ' + prefix + '-class ' + classPrefix"
        @tap="handleSwitch"
        :aria-checked="checked"
        :aria-disabled="disabled"
        aria-role="switch"
    >
        <view :class="_.cls(classPrefix + '__body', [['checked', checked], ['disabled', disabled || loading], size]) + ' ' + prefix + '-class-body'">
            <view
                :class="
                    _.cls(classPrefix + '__dot', [['checked', checked], ['disabled', disabled], ['plain', label.length != 2 && icon.length != 2 && !loading], size]) +
                    ' ' +
                    prefix +
                    '-class-dot'
                "
                :aria-hidden="true"
            >
                <view v-if="label" :class="_.cls(classPrefix + '__label', [['checked', checked], ['disabled', disabled], size]) + ' ' + prefix + '-class-label'">
                    <t-loading v-if="loading" inherit-color size="32rpx" />
                    <text v-else-if="label.length == 2">{{ checked ? label[0] : label[1] }}</text>
                    <t-icon v-else-if="icon.length == 2" :name="checked ? icon[0] : icon[1]" :t-class="_.cls(classPrefix + '__icon', [['checked', checked], size])" />
                </view>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tLoading from "../loading/loading";
import { __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-switch`;
let Switch = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = ["t-class", "t-class-label", "t-class-body", "t-class-dot"];
    this.behaviors = ["wx://form-field"];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      checked: false
    });
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      value(e) {
        const [t] = this.customValue;
        this.setData({
          checked: e === t
        });
      }
    };
    this.methods = {
      handleSwitch() {
        const {
          loading: e,
          disabled: t,
          value: s,
          customValue: o
        } = this;
        const [i, r] = o;
        e || t || this._trigger("change", {
          value: s === i ? r : i
        });
      }
    };
  }
};
Switch = __decorate([wxComponent()], Switch);
export default Switch;
</script>
<style>
@import './switch.css';
</style>
