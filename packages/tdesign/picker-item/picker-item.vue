<template>
    <view
        :style="_._style([style, customStyle])"
        :class="_.cls(classPrefix + '__group', []) + ' class ' + prefix + '-class'"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <view
            :class="classPrefix + '__wrapper'"
            :style="'transition: transform ' + duration + 'ms cubic-bezier(0.215, 0.61, 0.355, 1); transform: translate3d(0, ' + offset + 'px, 0)'"
        >
            <view
                :class="_.cls(classPrefix + '__item', [['active', curIndex == index]])"
                :style="'height: ' + pickItemHeight + 'px'"
                :data-index="index"
                @tap="onClickItem"
                v-for="(option, index) in formatOptions"
                :key="index"
            >
                <text :class="classPrefix + '__item-label'">{{ option[pickerKeys.label] }}</text>

                <slot :name="'label-suffix--' + index"></slot>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-picker-item`;
const range = function (t, e, i) {
  return Math.min(Math.max(t, e), i);
};
const momentum = (t, e) => {
  let i = t;
  i = Math.abs(i / e) / 0.005 * (i < 0 ? -1 : 1);
  return i;
};
let PickerItem = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.relations = {
      "../picker/picker": {
        type: "parent",
        linked(t) {
          if ("keys" in t.data) {
            const {
              keys: e
            } = t.data;
            if (null === e || JSON.stringify(this.pickerKeys) === JSON.stringify(e)) {
              return;
            }
            this.setData({
              pickerKeys: e
            });
          }
        }
      }
    };
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`];
    this = props;
    this.observers = {
      "options, pickerKeys"() {
        this.update();
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      offset: 0,
      duration: 0,
      value: "",
      curIndex: 0,
      columnIndex: 0,
      pickerKeys: {
        value: "value",
        label: "label"
      },
      formatOptions: props.options.value
    });
    this.lifetimes = {
      created() {
        this.StartY = 0;
        this.StartOffset = 0;
        this.startTime = 0;
      }
    };
    this.methods = {
      onClickItem(t) {
        const {
          index: e
        } = t.currentTarget.dataset;
        const {
          pickItemHeight: i
        } = this;
        const s = range(e, 0, this.getCount() - 1);
        if (s !== this._selectedIndex) {
          this.setData({
            offset: -s * i,
            curIndex: s,
            duration: 200
          });
        }
        this.updateSelected(s, true);
      },
      onTouchStart(t) {
        this.StartY = t.touches[0].clientY;
        this.StartOffset = this.offset;
        this.startTime = Date.now();
        this.setData({
          duration: 0
        });
      },
      onTouchMove(t) {
        const {
          StartY: e,
          StartOffset: i
        } = this;
        const {
          pickItemHeight: s
        } = this;
        const o = t.touches[0].clientY - e;
        const n = range(i + o, -this.getCount() * s, 0);
        this.setData({
          offset: n
        });
      },
      onTouchEnd(t) {
        const {
          offset: e,
          pickItemHeight: i
        } = this;
        const {
          startTime: s
        } = this;
        if (e === this.StartOffset) {
          return;
        }
        let o = 0;
        const n = t.changedTouches[0].clientY - this.StartY;
        const a = Date.now() - s;
        if (a < 300 && Math.abs(n) > 15) {
          o = momentum(n, a);
        }
        const r = range(e + o, -this.getCount() * i, 0);
        const c = range(Math.round(-r / i), 0, this.getCount() - 1);
        this.setData({
          offset: -c * i,
          duration: 1000,
          curIndex: c
        });
        if (c !== this._selectedIndex) {
          this.updateSelected(c, true);
        }
      },
      formatOption: (t, e, i) => "function" != typeof i ? t : t.map(t => i(t, e)),
      updateSelected(t, e) {
        var i;
        var s;
        var o;
        const {
          columnIndex: n,
          pickerKeys: a,
          formatOptions: r
        } = this;
        this._selectedIndex = t;
        this._selectedValue = null === (i = r[t]) || void 0 === i ? void 0 : i[null == a ? void 0 : a.value];
        this._selectedLabel = null === (s = r[t]) || void 0 === s ? void 0 : s[null == a ? void 0 : a.label];
        if (e) {
          null === (o = this.$parent) || void 0 === o || o.triggerColumnChange({
            index: t,
            column: n
          });
        }
      },
      update() {
        const {
          options: t,
          value: e,
          pickerKeys: i,
          pickItemHeight: s,
          format: o,
          columnIndex: n
        } = this;
        const a = this.formatOption(t, n, o);
        const r = a.findIndex(t => t[null == i ? void 0 : i.value] === e);
        const c = r > 0 ? r : 0;
        this.updateSelected(c, false);
        this.setData({
          formatOptions: a,
          offset: -c * s,
          curIndex: c
        });
      },
      getCount() {
        var t;
        var e;
        return null === (e = null === (t = this) || void 0 === t ? void 0 : t.options) || void 0 === e ? void 0 : e.length;
      }
    };
  }
};
PickerItem = __decorate([wxComponent()], PickerItem);
export default PickerItem;
</script>
<style>
@import './picker-item.css';
</style>
