<template>
    <view>
        <t-picker
            :style="_._style([style, customStyle])"
            :class="'class ' + prefix + '-class ' + classPrefix"
            :visible="visible"
            :value="columnsValue"
            :header="header"
            :title="title"
            :auto-close="autoClose"
            :confirm-btn="confirmBtn || locale.confirm"
            :cancel-btn="cancelBtn || locale.cancel"
            :use-popup="usePopup"
            :popup-props="popupProps"
            @pick="onColumnChange"
            @confirm="onConfirm"
            @cancel="onCancel"
            @visible-change="onVisibleChange"
            @close="onClose"
        >
            <slot slot="header" name="header" />
            <t-picker-item
                :class="_.cls(classPrefix + '__item', [['roomly', columns.length >= 5 && index == 0]])"
                :options="item"
                index="index"
                :format="formatter"
                v-for="(item, index) in columns"
                :key="index"
            ></t-picker-item>
            <slot slot="footer" name="footer" />
        </t-picker>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tPicker from "../picker/picker";
import tPickerItem from "../picker-item/picker-item";
var _a;
var _b;
import { __decorate } from "@/miniprogram_npm/tslib";
import config from "../common/config";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import dayjsLocaleMap from "./locale/dayjs";
const dayjs = require("@/miniprogram_npm/dayjs");
const localeData = require("./dayjs/plugin/localeData");
dayjs.extend(localeData);
dayjs.locale("zh-cn");
const defaultLocale = (null === (_a = dayjsLocaleMap[dayjs.locale()]) || void 0 === _a ? void 0 : _a.key) || (null === (_b = dayjsLocaleMap.default) || void 0 === _b ? void 0 : _b.key);
const {
  prefix: prefix
} = config;
const name = `${prefix}-date-time-picker`;
var ModeItem;
!function (e) {
  e.YEAR = "year";
  e.MONTH = "month";
  e.DATE = "date";
  e.HOUR = "hour";
  e.MINUTE = "minute";
  e.SECOND = "second";
}(ModeItem || (ModeItem = {}));
const DATE_MODES = ["year", "month", "date"];
const TIME_MODES = ["hour", "minute", "second"];
const FULL_MODES = [...DATE_MODES, ...TIME_MODES];
let DateTimePicker = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this = props;
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-confirm`, `${prefix}-class-cancel`, `${prefix}-class-title`];
    this.options = {
      multipleSlots: true
    };
    this.observers = {
      "start, end, value": function () {
        this.updateColumns();
      },
      customLocale(e) {
        if (e && dayjsLocaleMap[e].key) {
          this.setData({
            locale: dayjsLocaleMap[e].i18n,
            dayjsLocale: dayjsLocaleMap[e].key
          });
        }
      },
      mode(e) {
        const t = this.getFullModeArray(e);
        this.setData({
          fullModes: t
        });
        this.updateColumns();
      }
    };
    this.date = null;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      columns: [],
      columnsValue: [],
      fullModes: [],
      locale: dayjsLocaleMap[defaultLocale].i18n,
      dayjsLocale: dayjsLocaleMap[defaultLocale].key
    });
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.methods = {
      updateColumns() {
        this.date = this.getParseDate();
        const {
          columns: e,
          columnsValue: t
        } = this.getValueCols();
        this.setData({
          columns: e,
          columnsValue: t
        });
      },
      getDaysOfWeekInMonth(e) {
        const {
          locale: t,
          dayjsLocale: a
        } = this;
        const s = e.startOf("month");
        const o = e.endOf("month");
        const n = [];
        for (let e = 0; e <= o.diff(s, "days"); e += 1) {
          const o = s.add(e, "days").locale(a).format("ddd");
          n.push({
            value: `${e + 1}`,
            label: `${e + 1}${t.date || ""} ${o}`
          });
        }
        return n;
      },
      getParseDate() {
        const {
          value: e,
          defaultValue: t
        } = this;
        const a = this.getMinDate();
        let s = e || t;
        if (this.isTimeMode()) {
          const e = dayjs(a).format("YYYY-MM-DD");
          s = dayjs(`${e} ${s}`);
        }
        const o = dayjs(s || a);
        return o.isValid() ? o : a;
      },
      normalize: (e, t) => e && dayjs(e).isValid() ? dayjs(e) : t,
      getMinDate() {
        return this.normalize(this.start, dayjs().subtract(10, "year"));
      },
      getMaxDate() {
        return this.normalize(this.end, dayjs().add(10, "year"));
      },
      getDateRect(e = "default") {
        const t = this[{
          min: "getMinDate",
          max: "getMaxDate",
          default: "getDate"
        }[e]]();
        return ["year", "month", "date", "hour", "minute", "second"].map(e => {
          var a;
          return null === (a = t[e]) || void 0 === a ? void 0 : a.call(t);
        });
      },
      getDate() {
        return this.clipDate((null == this ? void 0 : this.date) || this.getMinDate());
      },
      clipDate(e) {
        const t = this.getMinDate();
        const a = this.getMaxDate();
        return dayjs(Math.min(Math.max(t.valueOf(), e.valueOf()), a.valueOf()));
      },
      setYear(e, t) {
        const a = e.date();
        const s = e.year(t).daysInMonth();
        return e.date(Math.min(a.valueOf(), s.valueOf())).year(t);
      },
      setMonth(e, t) {
        const a = e.date();
        const s = e.month(t).daysInMonth();
        return e.date(Math.min(a.valueOf(), s.valueOf())).month(t);
      },
      getColumnOptions() {
        const {
          fullModes: e,
          filter: t
        } = this;
        const a = [];
        null == e || e.forEach(e => {
          const s = this.getOptionByType(e);
          "function" == typeof t ? a.push(t(e, s)) : a.push(s);
        });
        return a;
      },
      getOptionByType(e) {
        var t;
        const {
          locale: a,
          steps: s,
          showWeek: o
        } = this;
        const n = [];
        const l = this.getOptionEdge("min", e);
        const i = this.getOptionEdge("max", e);
        const r = null !== (t = null == s ? void 0 : s[e]) && void 0 !== t ? t : 1;
        const u = dayjs().locale(this.dayjsLocale).localeData().monthsShort();
        if ("date" === e && o) {
          return this.getDaysOfWeekInMonth(this.date);
        }
        for (let t = l; t <= i; t += r) {
          n.push({
            value: `${t}`,
            label: "month" === e ? u[t] : `${t + a[e]}`
          });
        }
        return n;
      },
      getYearOptions(e) {
        const {
          locale: t
        } = this;
        const {
          minDateYear: a,
          maxDateYear: s
        } = e;
        const o = [];
        for (let e = a; e <= s; e += 1) {
          o.push({
            value: `${e}`,
            label: `${e + t.year}`
          });
        }
        return o;
      },
      getOptionEdge(e, t) {
        const a = this.getDateRect();
        const s = this.getDateRect(e);
        const o = {
          month: [0, 11],
          date: [1, this.getDate().daysInMonth()],
          hour: [0, 23],
          minute: [0, 59],
          second: [0, 59]
        };
        const n = ["year", "month", "date", "hour", "minute", "second"];
        for (let l = 0, i = a.length; l < i; l += 1) {
          if (n[l] === t) {
            return s[l];
          }
          if (s[l] !== a[l]) {
            return o[t]["min" === e ? 0 : 1];
          }
        }
        return o[t]["min" === e ? 0 : 1];
      },
      getMonthOptions() {
        const e = [];
        const t = this.getOptionEdge("min", "month");
        const a = this.getOptionEdge("max", "month");
        const s = dayjs.monthsShort();
        for (let o = t; o <= a; o += 1) {
          e.push({
            value: `${o}`,
            label: s[o]
          });
        }
        return e;
      },
      getDayOptions() {
        const {
          locale: e
        } = this;
        const t = [];
        const a = this.getOptionEdge("min", "date");
        const s = this.getOptionEdge("max", "date");
        for (let o = a; o <= s; o += 1) {
          t.push({
            value: `${o}`,
            label: `${o + e.day}`
          });
        }
        return t;
      },
      getHourOptions() {
        const {
          locale: e
        } = this;
        const t = [];
        const a = this.getOptionEdge("min", "hour");
        const s = this.getOptionEdge("max", "hour");
        for (let o = a; o <= s; o += 1) {
          t.push({
            value: `${o}`,
            label: `${o + e.hour}`
          });
        }
        return t;
      },
      getMinuteOptions() {
        const {
          locale: e
        } = this;
        const t = [];
        const a = this.getOptionEdge("min", "minute");
        const s = this.getOptionEdge("max", "minute");
        for (let o = a; o <= s; o += 1) {
          t.push({
            value: `${o}`,
            label: `${o + e.minute}`
          });
        }
        return t;
      },
      getValueCols() {
        return {
          columns: this.getColumnOptions(),
          columnsValue: this.getColumnsValue()
        };
      },
      getColumnsValue() {
        const {
          fullModes: e
        } = this;
        const t = this.getDate();
        const a = [];
        null == e || e.forEach(e => {
          a.push(`${t[e]()}`);
        });
        return a;
      },
      getNewDate(e, t) {
        let a = this.getDate();
        switch (t) {
          case ModeItem.YEAR:
            a = this.setYear(a, e);
            break;
          case ModeItem.MONTH:
            a = this.setMonth(a, e);
            break;
          case ModeItem.DATE:
            a = a.date(e);
            break;
          case ModeItem.HOUR:
            a = a.hour(e);
            break;
          case ModeItem.MINUTE:
            a = a.minute(e);
            break;
          case ModeItem.SECOND:
            a = a.second(e);
        }
        return this.clipDate(a);
      },
      onColumnChange(e) {
        const {
          value: t,
          column: a
        } = null == e ? void 0 : e.detail;
        const {
          fullModes: s,
          format: o
        } = this;
        const n = null == t ? void 0 : t[a];
        const l = null == s ? void 0 : s[a];
        const i = this.getNewDate(parseInt(n, 10), l);
        this.date = i;
        const {
          columns: r,
          columnsValue: u
        } = this.getValueCols();
        this.setData({
          columns: r,
          columnsValue: u
        });
        const d = this.getDate();
        const h = o ? d.format(o) : d.valueOf();
        this.$emit("pick", {
          detail: {
            value: h
          }
        });
      },
      onConfirm() {
        const {
          format: e
        } = this;
        const t = this.getDate();
        const a = e ? t.format(e) : t.valueOf();
        this._trigger("change", {
          value: a
        });
        this.$emit("confirm", {
          detail: {
            value: a
          }
        });
        this.resetColumns();
      },
      onCancel() {
        this.resetColumns();
        this.$emit("cancel");
      },
      onVisibleChange(e) {
        e.detail.visible || this.resetColumns();
      },
      onClose(e) {
        const {
          trigger: t
        } = e.detail;
        this.$emit("close", {
          detail: {
            trigger: t
          }
        });
      },
      resetColumns() {
        const e = this.getParseDate();
        this.date = e;
        const {
          columns: t,
          columnsValue: a
        } = this.getValueCols();
        this.setData({
          columns: t,
          columnsValue: a
        });
      }
    };
  }
  getFullModeArray(e) {
    if ("string" == typeof e || e instanceof String) {
      return this.getFullModeByModeString(e, FULL_MODES);
    }
    if (Array.isArray(e)) {
      if (1 === (null == e ? void 0 : e.length)) {
        return this.getFullModeByModeString(e[0], FULL_MODES);
      }
      if (2 === (null == e ? void 0 : e.length)) {
        return [...this.getFullModeByModeString(e[0], DATE_MODES), ...this.getFullModeByModeString(e[1], TIME_MODES)];
      }
    }
  }
  getFullModeByModeString(e, t) {
    if (!e) {
      return [];
    }
    const a = null == t ? void 0 : t.findIndex(t => e === t);
    return null == t ? void 0 : t.slice(0, a + 1);
  }
  isTimeMode() {
    const {
      fullModes: e
    } = this;
    return e[0] === ModeItem.HOUR;
  }
};
DateTimePicker = __decorate([wxComponent()], DateTimePicker);
export default DateTimePicker;
</script>
<style>
@import './date-time-picker.css';
</style>
