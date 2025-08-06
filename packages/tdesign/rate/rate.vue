<template>
    <view :class="classPrefix + ' class'" :style="_._style([style, customStyle])">
        <view
            :class="classPrefix + '__wrapper ' + prefix + '-class'"
            :style="'font-size:' + utils.regSize(size)"
            @touchstart="parseEventDynamicCode($event, !disabled ? 'onTouchStart' : '')"
            @touchmove="parseEventDynamicCode($event, !disabled ? 'onTouchMove' : '')"
            @tap="onTap"
            @touchend="parseEventDynamicCode($event, !disabled ? 'onTouchEnd' : '')"
            @touchcancel="parseEventDynamicCode($event, !disabled ? 'onTouchEnd' : '')"
            aria-role="slider"
            :aria-valuemax="count"
            :aria-valuemin="0"
            :aria-valuenow="value"
            :aria-valuetext="utils.getText(texts, value, defaultTexts)"
        >
            <t-icon
                :class="classPrefix + '__icon ' + utils.getIconClass(classPrefix + '__icon', defaultValue, value, index, allowHalf, disabled, scaleIndex)"
                :style="'margin-right: ' + (count - index > 1 ? _.addUnit(gap) : 0) + '; ' + utils.getColor(color)"
                :t-class="prefix + '-class-icon'"
                :name="utils.getIconName(defaultValue, value, index, icon)"
                :size="size"
                :prefix="iconPrefix"
                v-for="(item, index) in count"
                :key="index"
            ></t-icon>
        </view>
        <text v-if="showText" :class="_.cls(classPrefix + '__text', [['active', value > 0]]) + ' ' + prefix + '-class-text'" :aria-hidden="true">
            {{ utils.getText(texts, value, defaultTexts) }}
        </text>
        <text
            v-if="isVisibleToScreenReader"
            :class="
                _.cls(classPrefix + '__text', [
                    ['active', value > 0],
                    ['sr-only', isVisibleToScreenReader]
                ]) +
                ' ' +
                prefix +
                '-class-text'
            "
            aria-role="alert"
            aria-live="assertive"
        >
            {{ value + '星' }} {{ utils.getText(texts, value, defaultTexts) }}
        </text>
        <view v-if="tipsVisible && placement" :class="_.cls(classPrefix + '__tips', [placement])" :style="'left: ' + tipsLeft + 'px'" :aria-hidden="true">
            <block v-if="actionType == 'tap'">
                <view
                    v-if="allowHalf"
                    :class="_.cls(classPrefix + '__tips-item', [['active', utils.ceil(value) - 0.5 == value]])"
                    @tap="onSelect"
                    :data-value="utils.ceil(value) - 0.5"
                >
                    <t-icon
                        :class="classPrefix + '__icon ' + classPrefix + '__icon--selected-half'"
                        :name="utils.getIconName(defaultValue, value, index, icon)"
                        :size="size"
                        :style="utils.getColor(color)"
                    />
                    <view :class="classPrefix + '__tips-text'">{{ utils.ceil(value) - 0.5 }}</view>
                </view>
                <view :class="_.cls(classPrefix + '__tips-item', [['active', utils.ceil(value) == value]])" @tap="onSelect" :data-value="utils.ceil(value)">
                    <t-icon :class="_.cls(classPrefix + '__icon', ['selected'])" :name="utils.getIconName(defaultValue, 0, 0, icon)" :size="size" :style="utils.getColor(color)" />
                    <view :class="classPrefix + '__tips-text'">{{ utils.ceil(value) }}</view>
                </view>
            </block>
            <view
                v-else
                :class="_.cls(classPrefix + '__tips-item', [['active', utils.ceil(value) == value && actionType == 'tap']])"
                @tap="onSelect"
                :data-value="utils.ceil(value)"
            >
                <t-icon
                    :class="
                        _.cls(classPrefix + '__icon', [
                            ['selected', utils.ceil(value) == value],
                            ['selected-half', utils.ceil(value) != value]
                        ])
                    "
                    :name="utils.getIconName(defaultValue, 0, 0, icon)"
                    :size="size"
                    :style="utils.getColor(color)"
                />
                <view :class="classPrefix + '__tips-text'">{{ value }}</view>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="utils" lang="wxs" src="@/rate/rate.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { unitConvert, getRect } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-rate`;
let Rate = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-text`];
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      defaultTexts: ["极差", "失望", "一般", "满意", "惊喜"],
      tipsVisible: false,
      tipsLeft: 0,
      actionType: "",
      scaleIndex: -1,
      isVisibleToScreenReader: false
    });
    this.methods = {
      onTouch(e, t) {
        const {
          count: i,
          allowHalf: s,
          gap: o,
          value: a,
          size: n
        } = this;
        const [r] = e.changedTouches;
        const c = unitConvert(o);
        getRect(this, `.${name}__wrapper`).then(e => {
          const {
            width: p,
            left: h
          } = e;
          const l = (p - (i - 1) * c) / i;
          const d = (r.pageX - h + c) / (l + c);
          const u = d % 1;
          const m = d - u;
          let T = u <= 0.5 && s ? m + 0.5 : m + 1;
          T > i ? T = i : T < 0 && (T = 0);
          const x = Math.ceil(T - 1) * (unitConvert(o) + unitConvert(n)) + 0.5 * unitConvert(n);
          this.setData({
            tipsVisible: true,
            actionType: t,
            scaleIndex: Math.ceil(T),
            tipsLeft: Math.max(x, 0)
          });
          if (T !== a) {
            this._trigger("change", {
              value: T
            });
          }
          if (this.touchEnd) {
            this.hideTips();
          }
        });
      },
      onTap(e) {
        const {
          disabled: t
        } = this;
        t || this.onTouch(e, "tap");
      },
      onTouchStart() {
        this.touchEnd = false;
      },
      onTouchMove(e) {
        this.onTouch(e, "move");
        this.showAlertText();
      },
      onTouchEnd() {
        this.touchEnd = true;
        this.hideTips();
      },
      hideTips() {
        if ("move" === this.actionType) {
          this.setData({
            tipsVisible: false,
            scaleIndex: -1
          });
        }
      },
      onSelect(e) {
        const {
          value: t
        } = e.currentTarget.dataset;
        const {
          actionType: i
        } = this;
        if ("move" !== i) {
          this._trigger("change", {
            value: t
          });
          setTimeout(() => this.setData({
            tipsVisible: false,
            scaleIndex: -1
          }), 300);
        }
      },
      showAlertText() {
        if (true !== this.isVisibleToScreenReader) {
          this.setData({
            isVisibleToScreenReader: true
          });
          setTimeout(() => {
            this.setData({
              isVisibleToScreenReader: false
            });
          }, 2000);
        }
      }
    };
  }
};
Rate = __decorate([wxComponent()], Rate);
export default Rate;
</script>
<style>
@import './rate.css';
</style>
