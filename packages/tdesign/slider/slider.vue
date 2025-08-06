<template>
    <view
        :style="_._style([style, customStyle])"
        :class="
            _.cls(classPrefix, [
                ['top', label || scaleTextArray.length],
                ['disabled', disabled],
                ['range', range]
            ]) +
            ' class ' +
            prefix +
            '-class ' +
            (vertical ? classPrefix + '--vertical' : '')
        "
    >
        <block v-if="!range">
            <text v-if="showExtremeValue" :class="classPrefix + '__value ' + classPrefix + '__value--min'">{{ label ? t.getValue(label, min) : min }}</text>
            <view
                id="sliderLine"
                :class="_.cls(classPrefix + '__bar', [['disabled', disabled], theme, ['marks', isScale && theme == 'capsule']]) + ' ' + prefix + '-class-bar'"
                @tap="onSingleLineTap"
            >
                <block v-if="isScale">
                    <view
                        :class="
                            _.cls(classPrefix + '__scale-item', [
                                ['active', _value >= item.val],
                                ['disabled', disabled],
                                theme,
                                ['hidden', ((index == 0 || index == scaleArray.length - 1) && theme == 'capsule') || value == item.val]
                            ])
                        "
                        :style="(vertical ? 'top' : 'left') + ':' + item.left + 'px; ' + (vertical ? 'transform: translate(-50%, -50%);' : 'transform: translateX(-50%);')"
                        :aria-hidden="true"
                        v-for="(item, index) in scaleArray"
                        :key="index"
                    >
                        <view v-if="scaleTextArray.length" :class="_.cls(classPrefix + '__scale-desc', [theme])">{{ scaleTextArray[index] }}</view>
                    </view>
                </block>
                <view
                    :class="_.cls(classPrefix + '__line', [['disabled', disabled], theme, 'single']) + ' ' + prefix + '-class-bar-active'"
                    :style="(vertical ? 'height' : 'width') + ': ' + lineBarWidth"
                >
                    <view
                        id="singleDot"
                        :class="classPrefix + '__dot ' + prefix + '-class-cursor'"
                        @touchstart.stop.prevent="onTouchStart"
                        @touchmove.stop.prevent="onSingleLineTap"
                        @touchend.stop.prevent="onTouchEnd"
                        @touchcancel.stop.prevent="onTouchEnd"
                    >
                        <view
                            v-if="label || isVisibleToScreenReader"
                            :class="_.cls(classPrefix + '__dot-value', [['sr-only', !label]])"
                            aria-role="alert"
                            aria-live="assertive"
                            :aria-hidden="!isVisibleToScreenReader"
                        >
                            {{ t.getValue(label, _value) || _value }}
                        </view>
                        <view
                            :class="classPrefix + '__dot-slider'"
                            aria-role="slider"
                            :aria-disabled="disabled"
                            :aria-valuemax="max"
                            :aria-valuemin="min"
                            :aria-valuenow="_value"
                            :aria-valuetext="t.getValue(label, _value) || _value"
                        ></view>
                    </view>
                </view>
            </view>
            <text v-if="showExtremeValue" :class="classPrefix + '__value ' + classPrefix + '__value--max'">{{ label ? t.getValue(label, max) : max }}</text>
        </block>
        <block v-if="range">
            <view v-if="showExtremeValue" :class="classPrefix + '__range-extreme ' + classPrefix + '__range-extreme--min'">{{ min }}</view>
            <view
                id="sliderLine"
                @tap="onLineTap"
                :class="_.cls(classPrefix + '__bar', [['disabled', disabled], theme, ['marks', isScale && theme == 'capsule']]) + ' ' + prefix + '-class-bar'"
            >
                <block v-if="isScale">
                    <view
                        :class="
                            _.cls(classPrefix + '__scale-item', [
                                ['active', dotTopValue[1] >= item.val && item.val >= dotTopValue[0]],
                                ['disabled', disabled],
                                theme,
                                ['hidden', ((index == 0 || index == scaleArray.length - 1) && theme == 'capsule') || value == item.val]
                            ])
                        "
                        :style="(vertical ? 'top' : 'left') + ':' + item.left + 'px; ' + (vertical ? 'transform: translate(-50%, -50%);' : 'transform: translateX(-50%);')"
                        :aria-hidden="true"
                        v-for="(item, index) in scaleArray"
                        :key="index"
                    >
                        <view v-if="scaleTextArray.length" :class="_.cls(classPrefix + '__scale-desc', [theme])">{{ scaleTextArray[index] }}</view>
                    </view>
                </block>
                <view
                    :class="_.cls(classPrefix + '__line', [['disabled', disabled], theme]) + ' ' + prefix + '-class-bar-active'"
                    :style="(vertical ? 'top' : 'left') + ': ' + lineLeft + 'px; ' + (vertical ? 'bottom' : 'right') + ': ' + lineRight + 'px'"
                >
                    <view
                        id="leftDot"
                        @touchstart.stop.prevent="onTouchStart"
                        @touchmove.stop.prevent="onTouchMoveLeft"
                        @touchend.stop.prevent="onTouchEnd"
                        @touchcancel.stop.prevent="onTouchEnd"
                        :class="classPrefix + '__dot ' + classPrefix + '__dot--left ' + prefix + '-class-cursor'"
                    >
                        <view
                            v-if="label || isVisibleToScreenReader"
                            :class="_.cls(classPrefix + '__dot-value', [['sr-only', !label]])"
                            aria-role="alert"
                            aria-live="assertive"
                            :aria-hidden="!isVisibleToScreenReader"
                        >
                            {{ t.getValue(label, dotTopValue[0]) || dotTopValue[0] }}
                        </view>
                        <view
                            :class="classPrefix + '__dot-slider'"
                            aria-role="slider"
                            :aria-disabled="disabled"
                            :aria-valuemax="max"
                            :aria-valuemin="min"
                            :aria-valuenow="dotTopValue[0]"
                            :aria-valuetext="t.getValue(label, dotTopValue[0]) || dotTopValue[0]"
                        ></view>
                    </view>
                    <view
                        id="rightDot"
                        @touchstart.stop.prevent="onTouchStart"
                        @touchmove.stop.prevent="onTouchMoveRight"
                        @touchend.stop.prevent="onTouchEnd"
                        @touchcancel.stop.prevent="onTouchEnd"
                        :class="classPrefix + '__dot ' + classPrefix + '__dot--right ' + prefix + '-class-cursor'"
                    >
                        <view
                            v-if="label || isVisibleToScreenReader"
                            :class="_.cls(classPrefix + '__dot-value', [['sr-only', !label]])"
                            aria-role="alert"
                            aria-live="assertive"
                            :aria-hidden="!isVisibleToScreenReader"
                        >
                            {{ t.getValue(label, dotTopValue[1]) || dotTopValue[1] }}
                        </view>
                        <view
                            :class="classPrefix + '__dot-slider'"
                            aria-role="slider"
                            :aria-disabled="disabled"
                            :aria-valuemax="max"
                            :aria-valuemin="min"
                            :aria-valuenow="dotTopValue[1]"
                            :aria-valuetext="t.getValue(label, dotTopValue[1]) || dotTopValue[1]"
                        ></view>
                    </view>
                </view>
            </view>
            <view v-if="showExtremeValue" :class="classPrefix + '__range-extreme ' + classPrefix + '__range-extreme--max'">{{ max }}</view>
        </block>
    </view>
</template>
<script module="t" lang="wxs" src="@/slider/slider.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __awaiter, __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import { trimSingleValue, trimValue } from "./tool";
import props from "./props";
import { getRect } from "../common/utils";
import Bus from "../common/bus";
const {
  prefix: prefix
} = config;
const name = `${prefix}-slider`;
let Slider = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-bar`, `${prefix}-class-bar-active`, `${prefix}-class-bar-disabled`, `${prefix}-class-cursor`];
    this.options = {
      pureDataPattern: /^__/
    };
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.setData({
      sliderStyles: "",
      classPrefix: name,
      initialLeft: null,
      initialRight: null,
      activeLeft: 0,
      activeRight: 0,
      maxRange: 0,
      lineLeft: 0,
      lineRight: 0,
      dotTopValue: [0, 0],
      _value: 0,
      blockSize: 20,
      isScale: false,
      scaleArray: [],
      scaleTextArray: [],
      prefix: prefix,
      isVisibleToScreenReader: false,
      identifier: [-1, -1],
      __inited: false
    });
    this.observers = {
      value(e) {
        this.handlePropsChange(e);
      },
      _value(e) {
        this.bus.on("initial", () => this.renderLine(e));
        this.toggleA11yTips();
      },
      marks(e) {
        this.bus.on("initial", () => this.handleMark(e));
      }
    };
    this.lifetimes = {
      created() {
        this.bus = new Bus();
      },
      attached() {
        const {
          value: e
        } = this;
        e || this.handlePropsChange(0);
        this.init();
        this.injectPageScroll();
      }
    };
  }
  injectPageScroll() {
    const {
      range: e,
      vertical: t
    } = this;
    if (!e || !t) {
      return;
    }
    const i = getCurrentPages() || [];
    let s = null;
    if (i && i.length - 1 >= 0) {
      s = i[i.length - 1];
    }
    if (!s) {
      return;
    }
    const r = null == s ? void 0 : s.onPageScroll;
    s.onPageScroll = e => {
      null == r || r.call(this, e);
      this.observerScrollTop(e);
    };
  }
  observerScrollTop(e) {
    const {
      scrollTop: t
    } = e || {};
    this.pageScrollTop = t;
  }
  toggleA11yTips() {
    this.setData({
      isVisibleToScreenReader: true
    });
    setTimeout(() => {
      this.setData({
        isVisibleToScreenReader: false
      });
    }, 2000);
  }
  renderLine(e) {
    const {
      min: t,
      max: i,
      range: s
    } = this;
    const {
      maxRange: r
    } = this;
    if (s) {
      const s = r * (e[0] - Number(t)) / (Number(i) - Number(t));
      const a = r * (Number(i) - e[1]) / (Number(i) - Number(t));
      this.setLineStyle(s, a);
    } else {
      this.setSingleBarWidth(e);
    }
  }
  triggerValue(e) {
    if (this.preval !== e) {
      this.preval = e;
      this._trigger("change", {
        value: trimValue(e, this)
      });
    }
  }
  handlePropsChange(e) {
    const t = trimValue(e, this);
    const i = () => {
      this.setData({
        _value: t
      });
    };
    0 !== this.maxRange ? i() : this.init().then(i);
  }
  valueToPosition(e) {
    const {
      min: t,
      max: i,
      theme: s
    } = this;
    const {
      blockSize: r,
      maxRange: a
    } = this;
    const n = "capsule" === s ? Number(r) / 2 : 0;
    return Math.round((Number(e) - Number(t)) / (Number(i) - Number(t)) * a) + n;
  }
  handleMark(e) {
    const t = e => e.map(e => ({
      val: e,
      left: this.valueToPosition(e)
    }));
    if ((null == e ? void 0 : e.length) && Array.isArray(e)) {
      this.setData({
        isScale: true,
        scaleArray: t(e),
        scaleTextArray: []
      });
    }
    if ("[object Object]" === Object.prototype.toString.call(e)) {
      const i = Object.keys(e).map(e => Number(e));
      const s = i.map(t => e[t]);
      this.setData({
        isScale: i.length > 0,
        scaleArray: t(i),
        scaleTextArray: s
      });
    }
  }
  setSingleBarWidth(e) {
    const t = this.valueToPosition(e);
    this.setData({
      lineBarWidth: `${t}px`
    });
  }
  init() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.__inited) {
        return;
      }
      const e = yield getRect(this, "#sliderLine");
      const {
        blockSize: t
      } = this;
      const {
        theme: i,
        vertical: s
      } = this;
      const r = Number(t) / 2;
      const {
        top: a,
        bottom: n,
        right: o,
        left: l
      } = e;
      let h = s ? n - a : o - l;
      let c = s ? a : l;
      let u = s ? n : o;
      0 === c && 0 === u || ("capsule" === i && (h = h - Number(t) - 6, c -= r, u -= r), this.setData({
        maxRange: h,
        initialLeft: c,
        initialRight: u,
        __inited: true
      }), this.bus.emit("initial"));
    });
  }
  stepValue(e) {
    const {
      step: t,
      min: i,
      max: s
    } = this;
    const r = String(t).indexOf(".") > -1 ? String(t).length - String(t).indexOf(".") - 1 : 0;
    return trimSingleValue(Number((Math.round(e / Number(t)) * Number(t)).toFixed(r)), Number(i), Number(s));
  }
  onSingleLineTap(e) {
    const {
      disabled: t
    } = this;
    if (t) {
      return;
    }
    const i = -1 === this.identifier[0];
    if (i) {
      const [t] = e.changedTouches;
      this.identifier[0] = t.identifier;
    }
    const s = this.getSingleChangeValue(e);
    if (i) {
      this.identifier[0] = -1;
    }
    this.triggerValue(s);
  }
  getSingleChangeValue(e) {
    const {
      min: t,
      max: i,
      theme: s,
      vertical: r
    } = this;
    const {
      initialLeft: a,
      maxRange: n,
      blockSize: o
    } = this;
    const l = e.changedTouches.find(e => e.identifier === this.identifier[0]);
    const h = this.getPagePosition(l);
    let c = 0;
    "capsule" === s ? (c = Number(o), r && (c *= 2), c += 6) : r && (c = Number(o));
    const u = h - a - c;
    let p = 0;
    p = u <= 0 ? Number(t) : u >= n ? Number(i) : u / n * (Number(i) - Number(t)) + Number(t);
    return this.stepValue(p);
  }
  convertPosToValue(e, t) {
    const {
      maxRange: i
    } = this;
    const {
      max: s,
      min: r
    } = this;
    return 0 === t ? e / i * (Number(s) - Number(r)) + Number(r) : Number(s) - e / i * (Number(s) - Number(r));
  }
  onLineTap(e) {
    const {
      disabled: t,
      theme: i,
      vertical: s
    } = this;
    const {
      initialLeft: r,
      initialRight: a,
      maxRange: n,
      blockSize: o
    } = this;
    if (t) {
      return;
    }
    const [l] = e.changedTouches;
    const h = this.getPagePosition(l);
    const c = "capsule" === i ? Number(o) / 2 : 0;
    h - r < 0 || -(h - a) > n + Number(o) || Promise.all([getRect(this, "#leftDot"), getRect(this, "#rightDot")]).then(([e, t]) => {
      const n = this.pageScrollTop || 0;
      const l = s ? e.top + n : e.left;
      const u = Math.abs(h - l - c);
      const p = s ? t.top + n : t.left;
      const d = u < Math.abs(p - h + c);
      let g = 0;
      "capsule" === i ? (g = Number(o), s && (g *= 2), g += 6) : s && (g = Number(o));
      if (d) {
        const e = h - r - g;
        const t = this.convertPosToValue(e, 0);
        this.triggerValue([this.stepValue(t), this._value[1]]);
      } else {
        let e = -(h - a);
        if (s) {
          e += g / 2;
        }
        const t = this.convertPosToValue(e, 1);
        this.triggerValue([this._value[0], this.stepValue(t)]);
      }
    });
  }
  onTouchStart(e) {
    this.$emit("dragstart", {
      detail: {
        e: e
      }
    });
    const [t] = e.changedTouches;
    "rightDot" === e.currentTarget.id ? this.identifier[1] = t.identifier : this.identifier[0] = t.identifier;
  }
  onTouchMoveLeft(e) {
    const {
      disabled: t,
      theme: i,
      vertical: s
    } = this;
    const {
      initialLeft: r,
      _value: a,
      blockSize: n
    } = this;
    if (t) {
      return;
    }
    const o = e.changedTouches.find(e => e.identifier === this.identifier[0]);
    const l = this.getPagePosition(o);
    let h = 0;
    if ("capsule" === i) {
      h += Number(n);
    }
    if (s) {
      h += Number(n) + 6;
    }
    const c = l - r - h;
    const u = [...a];
    const p = this.convertPosToValue(c, 0);
    u[0] = this.stepValue(p);
    this.triggerValue(u);
  }
  onTouchMoveRight(e) {
    const {
      disabled: t,
      vertical: i
    } = this;
    const {
      initialRight: s,
      _value: r,
      blockSize: a
    } = this;
    if (t) {
      return;
    }
    const n = e.changedTouches.find(e => e.identifier === this.identifier[1]);
    const o = this.getPagePosition(n);
    let l = 0;
    if (i) {
      l += Number(a) / 2 + 6;
    }
    const h = -(o - s - l);
    const c = [...r];
    const u = this.convertPosToValue(h, 1);
    c[1] = this.stepValue(u);
    this.triggerValue(c);
  }
  setLineStyle(e, t) {
    const {
      theme: i
    } = this;
    const {
      blockSize: s,
      maxRange: r
    } = this;
    const a = "capsule" === i ? Number(s) / 2 : 0;
    const [n, o] = this._value;
    const l = e => parseInt(e, 10);
    this.setData({
      dotTopValue: [n, o]
    });
    e + t <= r ? this.setData({
      lineLeft: l(e + a),
      lineRight: l(t + a)
    }) : this.setData({
      lineLeft: l(r + a - t),
      lineRight: l(r - e + 1.5 * a)
    });
  }
  onTouchEnd(e) {
    this.$emit("dragend", {
      detail: {
        e: e,
        value: this._value
      }
    });
    "rightDot" === e.currentTarget.id ? this.identifier[1] = -1 : this.identifier[0] = -1;
  }
  getPagePosition(e) {
    const {
      pageX: t,
      pageY: i
    } = e;
    const {
      vertical: s
    } = this;
    return s ? i : t;
  }
};
Slider = __decorate([wxComponent()], Slider);
export default Slider;
</script>
<style>
@import './slider.css';
</style>
