<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' class'">
        <view v-if="theme === _this.PRO_THEME.LINE" :class="classPrefix + '--thin ' + classPrefix + '--status--' + (status || computedStatus) + ' ' + prefix + '-class'">
            <view
                aria-role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-valuenow="computedProgress"
                :aria-label="ariaLabel || (isIOS ? _this.getIOSAriaLabel(status) : _this.getAndroidAriaLabel(status))"
                aria-live="polite"
                :class="classPrefix + '__bar'"
                :style="'height: ' + heightBar + 'px;border-radius: ' + heightBar + 'px;background-color: ' + bgColorBar"
            >
                <view :class="classPrefix + '__inner ' + prefix + '-class-bar'" :style="'background: ' + colorBar + '; width: ' + (computedProgress + '%')"></view>
            </view>
            <view v-if="label" :class="classPrefix + '__info ' + prefix + '-class-label'" :aria-hidden="true">
                <!-- parse <template v-if="_.includes(_this.STATUS, status)" is="icon" :data="tClass: classPrefix + '__icon', size:'44rpx', name: _this.LINE_STATUS_ICON[status]"></template> -->
                <block name="icon" v-if="false" v-if="_.includes(_this.STATUS, status)">
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
                <text v-else>{{ _.isString(label) ? label : computedProgress + '%' }}</text>
            </view>
            <slot name="label" />
        </view>
        <view
            aria-role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="computedProgress"
            :aria-label="ariaLabel || (isIOS ? _this.getIOSAriaLabel(status) : _this.getAndroidAriaLabel(status))"
            aria-live="polite"
            v-if="theme === _this.PRO_THEME.PLUMP"
            :class="
                classPrefix +
                '__bar ' +
                classPrefix +
                '--plump ' +
                (computedProgress > 10 ? classPrefix + '--over-ten' : classPrefix + '--under-ten') +
                ' ' +
                classPrefix +
                '--status--' +
                (status || computedStatus) +
                ' ' +
                prefix +
                '-class'
            "
            :style="'height: ' + heightBar + 'px;border-radius: ' + heightBar + 'px;background-color: ' + bgColorBar"
        >
            <view :class="classPrefix + '__inner ' + prefix + '-class-bar'" :style="'background: ' + colorBar + '; width: ' + computedProgress + '%'">
                <view v-if="label && computedProgress > 10" :class="classPrefix + '__info ' + prefix + '-class-label'">
                    <text>{{ _.isString(label) ? label : computedProgress + '%' }}</text>
                </view>
                <slot v-if="computedProgress > 10" name="label" />
            </view>
            <view v-if="label && computedProgress <= 10" :class="classPrefix + '__info ' + prefix + '-class-label'" :aria-hidden="true">
                <text>{{ _.isString(label) ? label : computedProgress + '%' }}</text>
            </view>
            <slot v-if="computedProgress <= 10" name="label" />
        </view>
        <view v-if="theme === _this.PRO_THEME.CIRCLE" :class="classPrefix + '--status--' + (status || computedStatus) + ' ' + prefix + '-class'">
            <view
                aria-role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-valuenow="computedProgress"
                :aria-label="ariaLabel || (isIOS ? _this.getIOSAriaLabel(status) : _this.getAndroidAriaLabel(status))"
                aria-live="polite"
                :class="_.cls(classPrefix + '__canvas--circle', [[size, true]])"
                :style="
                    _this.getCircleStyle(size, heightBar) +
                    '; background-image: conic-gradient(from var(--td-progress-circle-from), ' +
                    (colorCircle || _this.STATUS_COLOR[status] || 'var(--td-progress-inner-bg-color)') +
                    ' ' +
                    computedProgress +
                    '%, ' +
                    (bgColorBar || 'var(--td-progress-track-bg-color)') +
                    ' 0%);'
                "
            >
                <view :class="classPrefix + '__canvas--inner ' + prefix + '-class-bar'">
                    <view v-if="label" :class="classPrefix + '__info ' + prefix + '-class-label'" :aria-hidden="true">
                        <!-- parse <template v-if="_.includes(_this.STATUS, status)" is="icon" :data="tClass: classPrefix + '__icon', size:'96rpx', name: _this.CIRCLE_STATUS_ICON[status]"></template> -->
                        <block name="icon" v-if="false" v-if="_.includes(_this.STATUS, status)">
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
                        <text v-else>{{ _.isString(label) ? label : computedProgress + '%' }}</text>
                    </view>
                    <slot name="label" />
                </view>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/progress/progress.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getBackgroundColor } from "./utils";
import { unitConvert, isIOS as isIOSValidator } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-progress`;
let Progress = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-bar`, `${prefix}-class-label`];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      colorBar: "",
      heightBar: "",
      computedStatus: "",
      computedProgress: 0,
      isIOS: false
    });
    this.observers = {
      percentage(o) {
        o = Math.max(0, Math.min(o, 100));
        this.setData({
          computedStatus: 100 === o ? "success" : "",
          computedProgress: o
        });
      },
      color(o) {
        this.setData({
          colorBar: getBackgroundColor(o),
          colorCircle: "object" == typeof o ? "" : o
        });
      },
      strokeWidth(o) {
        if (!o) {
          return "";
        }
        this.setData({
          heightBar: unitConvert(o)
        });
      },
      trackColor(o) {
        this.setData({
          bgColorBar: o
        });
      }
    };
  }
  attached() {
    const o = isIOSValidator();
    this.setData({
      isIOS: o
    });
  }
};
Progress = __decorate([wxComponent()], Progress);
export default Progress;
</script>
<style>
@import './progress.css';
@import 'undefined';
</style>
