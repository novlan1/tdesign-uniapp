<template>
  <view>
    <t-picker
      :custom-style="_._style([style, customStyle])"
      :class="'class ' + tClass + ' ' + classPrefix"
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
      <template
        #header
      >
        <slot
          name="header"
        />
      </template>

      <t-picker-item
        v-for="(item, index) in columns"
        :key="index"
        :class="_.cls(classPrefix + '__item', [['roomly', columns.length >= 5 && index == 0]])"
        :options="item"
        index="index"
        :format="formatter"
      />
      <template
        #footer
      >
        <slot
          name="footer"
        />
      </template>
    </t-picker>
  </view>
</template>
<script>
import tPicker from '../picker/picker';
import tPickerItem from '../picker-item/picker-item';
import { prefix } from '../common/config';
import { uniComponent } from '../common/src/index';
import props from './props';
import dayjsLocaleMap from './locale/dayjs';
import _ from '../common/utils.wxs';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

// const dayjs = require('dayjs');
// const localeData = require('dayjs/plugin/localeData');
/**
 * dayjs LocaleData 插件
 * https://dayjs.fenxianglu.cn/category/plugin.html#localedata
 */
dayjs.extend(localeData);
dayjs.locale('zh-cn');

// const defaultLocale = dayjsLocaleMap.default.key;
const defaultLocale = dayjsLocaleMap[dayjs.locale()]?.key || dayjsLocaleMap.default?.key;


const name = `${prefix}-date-time-picker`;

const ModeItem = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
};

const DATE_MODES = ['year', 'month', 'date'];
const TIME_MODES = ['hour', 'minute', 'second'];
const FULL_MODES = [...DATE_MODES, ...TIME_MODES];

export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-confirm`,
    `${prefix}-class-cancel`,
    `${prefix}-class-title`,
  ],
  components: {
    tPicker,
    tPickerItem,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      columns: [],
      columnsValue: [],
      fullModes: [],
      locale: dayjsLocaleMap[defaultLocale].i18n, // 国际化语言包
      dayjsLocale: dayjsLocaleMap[defaultLocale].key, // dayjs 自适应的 key
      _,

      dataValue: this.value ?? this.defaultValue,
    };
  },
  watch: {
    value: {
      handler(v) {
        this.dataValue = v;
      },
      immediate: true,
      deep: true,
    },

    start: 'updateColumns',
    end: 'updateColumns',
    dataValue: 'updateColumns',

    customLocale: {
      handler(v) {
        if (!v || !dayjsLocaleMap[v].key) return;
        this.locale = dayjsLocaleMap[v].i18n;
        this.dayjsLocale = dayjsLocaleMap[v].key;
      },
      immediate: true,
    },

    mode: {
      handler(m) {
        const fullModes = this.getFullModeArray(m);
        this.fullModes = fullModes;
        this.updateColumns();
      },
      immediate: true,
    },
  },
  created() {
    this.date = null;
  },
  mounted() {

  },
  methods: {
    updateColumns() {
      this.date = this.getParseDate();

      const { columns, columnsValue } = this.getValueCols();
      this.columns = columns,
      this.columnsValue = columnsValue;
    },

    getDaysOfWeekInMonth(date, type) {
      const { locale, steps, dayjsLocale } = this;
      const startOfMonth = date.startOf('month');
      const minEdge = this.getOptionEdge('min', type);
      const maxEdge = this.getOptionEdge('max', type);
      const step = steps?.[type] ?? 1;
      const daysOfWeek = [];

      for (let i = minEdge; i <= maxEdge; i += step) {
        const currentDate = startOfMonth.date(i).locale(dayjsLocale);
        const dayName = currentDate.format('ddd');
        daysOfWeek.push({
          value: `${i}`,
          label: `${i}${locale.date || ''} ${dayName}`,
        });
      }

      return daysOfWeek;
    },

    getParseDate() {
      const { dataValue } = this;
      const minDate = this.getMinDate();

      const isTimeMode = this.isTimeMode();
      let currentValue = dataValue;

      // 时间需要补齐前缀
      if (isTimeMode) {
        const dateStr = dayjs(minDate).format('YYYY-MM-DD');
        currentValue = dayjs(`${dateStr} ${currentValue}`);
      }

      const parseDate = dayjs(currentValue || minDate);
      const isDateValid = parseDate.isValid();

      return isDateValid ? parseDate : minDate;
    },

    normalize(val, defaultDay) {
      return val && dayjs(val).isValid() ? dayjs(val) : defaultDay;
    },

    getMinDate() {
      return this.normalize(this.start, dayjs().subtract(10, 'year'));
    },

    getMaxDate() {
      return this.normalize(this.end, dayjs().add(10, 'year'));
    },

    getDateRect(type = 'default') {
      const map = {
        min: 'getMinDate',
        max: 'getMaxDate',
        default: 'getDate',
      };
      const date = this[map[type]]();
      const keys = ['year', 'month', 'date', 'hour', 'minute', 'second'];

      return keys.map(k => date[k]?.());
    },

    getDate() {
      return this.clipDate(this?.date || this.getMinDate());
    },

    // 数据裁减 确保数据不越界
    clipDate(date) {
      const minDate = this.getMinDate();
      const maxDate = this.getMaxDate();
      return dayjs(Math.min(Math.max(minDate.valueOf(), date.valueOf()), maxDate.valueOf()));
    },

    // 年变化时 需要修正 日数据  例如 2 月的 28 | 29
    setYear(date, year) {
      const beforeMonthDays = date.date();
      const afterMonthDays = date.year(year).daysInMonth();

      const tempDate = date.date(Math.min(beforeMonthDays.valueOf(), afterMonthDays.valueOf()));
      return tempDate.year(year);
    },

    // 月变化时 需要修正 日数据边界
    setMonth(date, month) {
      const beforeMonthDays = date.date();
      const afterMonthDays = date.month(month).daysInMonth();

      const tempDate = date.date(Math.min(beforeMonthDays.valueOf(), afterMonthDays.valueOf()));
      return tempDate.month(month);
    },

    getColumnOptions() {
      const { fullModes, filter } = this;

      const columnOptions = [];
      fullModes?.forEach((mode) => {
        const columnOption = this.getOptionByType(mode);
        if (typeof filter === 'function') {
          columnOptions.push(filter(mode, columnOption));
        } else {
          columnOptions.push(columnOption);
        }
      });
      return columnOptions;
    },

    getOptionByType(type) {
      const { locale, steps, showWeek } = this;
      const options = [];

      const minEdge = this.getOptionEdge('min', type);
      const maxEdge = this.getOptionEdge('max', type);
      const step = steps?.[type] ?? 1;
      const dayjsMonthsShort = dayjs().locale(this.dayjsLocale)
        .localeData()
        .monthsShort();

      if (type === 'date' && showWeek) {
        return this.getDaysOfWeekInMonth(this.date, type);
      }

      for (let i = minEdge; i <= maxEdge; i += step) {
        options.push({
          value: `${i}`,
          label: type === 'month' ? dayjsMonthsShort[i] : `${i + locale[type]}`,
        });
      }

      return options;
    },

    getYearOptions(dateParams) {
      const { locale } = this;
      const { minDateYear, maxDateYear } = dateParams;

      const years = [];
      for (let i = minDateYear; i <= maxDateYear; i += 1) {
        years.push({
          value: `${i}`,
          label: `${i + locale.year}`,
        });
      }
      return years;
    },

    getOptionEdge(minOrMax, type) {
      const selDateArray = this.getDateRect();
      const compareArray = this.getDateRect(minOrMax);
      const edge = {
        month: [0, 11],
        date: [1, this.getDate().daysInMonth()],
        hour: [0, 23],
        minute: [0, 59],
        second: [0, 59],
      };
      const types = ['year', 'month', 'date', 'hour', 'minute', 'second'];

      for (let i = 0, size = selDateArray.length; i < size; i += 1) {
        if (types[i] === type) return compareArray[i];
        if (compareArray[i] !== selDateArray[i]) return edge[type][minOrMax === 'min' ? 0 : 1];
      }
      return edge[type][minOrMax === 'min' ? 0 : 1];
    },

    getMonthOptions() {
      const months = [];

      const minMonth = this.getOptionEdge('min', 'month');
      const maxMonth = this.getOptionEdge('max', 'month');
      const dayjsMonthsShort = dayjs.monthsShort();

      for (let i = minMonth; i <= maxMonth; i += 1) {
        months.push({
          value: `${i}`,
          label: dayjsMonthsShort[i],
        });
      }

      return months;
    },

    getDayOptions() {
      const { locale } = this;
      const days = [];
      const minDay = this.getOptionEdge('min', 'date');
      const maxDay = this.getOptionEdge('max', 'date');

      for (let i = minDay; i <= maxDay; i += 1) {
        days.push({
          value: `${i}`,
          label: `${i + locale.day}`,
        });
      }

      return days;
    },

    getHourOptions() {
      const { locale } = this;
      const hours = [];
      const minHour = this.getOptionEdge('min', 'hour');
      const maxHour = this.getOptionEdge('max', 'hour');

      for (let i = minHour; i <= maxHour; i += 1) {
        hours.push({
          value: `${i}`,
          label: `${i + locale.hour}`,
        });
      }

      return hours;
    },

    getMinuteOptions() {
      const { locale } = this;
      const minutes = [];
      const minMinute = this.getOptionEdge('min', 'minute');
      const maxMinute = this.getOptionEdge('max', 'minute');

      for (let i = minMinute; i <= maxMinute; i += 1) {
        minutes.push({
          value: `${i}`,
          label: `${i + locale.minute}`,
        });
      }

      return minutes;
    },

    getValueCols() {
      return {
        columns: this.getColumnOptions(),
        columnsValue: this.getColumnsValue(),
      };
    },

    getColumnsValue() {
      const { fullModes } = this;
      const date = this.getDate();

      const columnsValue = [];

      fullModes?.forEach((mode) => {
        columnsValue.push(`${date[mode]()}`);
      });

      return columnsValue;
    },

    getNewDate(value, type) {
      let newValue = this.getDate();

      switch (type) {
        case ModeItem.YEAR:
          newValue = this.setYear(newValue, value);
          break;
        case ModeItem.MONTH:
          newValue = this.setMonth(newValue, value);
          break;
        case ModeItem.DATE:
          newValue = newValue.date(value);
          break;
        case ModeItem.HOUR:
          newValue = newValue.hour(value);
          break;
        case ModeItem.MINUTE:
          newValue = newValue.minute(value);
          break;
        case ModeItem.SECOND:
          newValue = newValue.second(value);
          break;
        default:
          break;
      }

      return this.clipDate(newValue);
    },

    onColumnChange(e) {
      const { value, column } = e;
      const { fullModes, format } = this;

      const columnValue = value?.[column];
      const columnType = fullModes?.[column];

      const newValue = this.getNewDate(parseInt(columnValue, 10), columnType);

      this.date = newValue;

      const { columns, columnsValue } = this.getValueCols();

      this.columns = columns;
      this.columnsValue = columnsValue;

      const date = this.getDate();
      const pickValue = format ? date.format(format) : date.valueOf();

      this.$emit('pick', { value: pickValue });
    },

    onConfirm() {
      const { format } = this;
      const date = this.getDate();

      const value = format ? date.format(format) : date.valueOf();
      this._trigger('change', { value });
      this.$emit('confirm', { value });
      this.resetColumns();
    },

    onCancel() {
      this.resetColumns();
      this.$emit('cancel');
    },

    onVisibleChange(e) {
      if (!e.visible) {
        this.resetColumns();
      }
    },

    onClose(e) {
      const { trigger } = e;

      this.$emit('close', { trigger });
      this.$emit('update:visible', false);
    },

    resetColumns() {
      const parseDate = this.getParseDate();

      this.date = parseDate;

      const { columns, columnsValue } = this.getValueCols();

      this.columns = columns;
      this.columnsValue = columnsValue;
    },

    // 将简写的 mode 转化成枚举值
    getFullModeArray(mode) {
    // 简易模式
      if (typeof mode === 'string' || mode instanceof String) {
        return this.getFullModeByModeString(mode, FULL_MODES);
      }

      // 高级模式
      if (Array.isArray(mode)) {
        if (mode?.length === 1) {
          return this.getFullModeByModeString(mode[0], FULL_MODES);
        }

        if (mode?.length === 2) {
          const dateModes = this.getFullModeByModeString(mode[0], DATE_MODES);
          const timeModes = this.getFullModeByModeString(mode[1], TIME_MODES);
          return [...dateModes, ...timeModes];
        }
      }
    },

    getFullModeByModeString(modeString, matchModes) {
      if (!modeString) {
        return [];
      }

      const endIndex = matchModes?.findIndex(mode => modeString === mode);
      return matchModes?.slice(0, endIndex + 1);
    },

    // 仅展示时或者时分 需要单独特殊处理
    isTimeMode() {
      const { fullModes } = this;
      return fullModes[0] === ModeItem.HOUR;
    },
  },


});


// let DateTimePicker = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.properties = props;
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-confirm`, `${prefix}-class-cancel`, `${prefix}-class-title`];
//     this.options = {
//       multipleSlots: true,
//     };
//     this.observers = {
//       'start, end, value'() {
//         this.updateColumns();
//       },
//       customLocale(e) {
//         if (e && dayjsLocaleMap[e].key) {
//           this.setData({
//             locale: dayjsLocaleMap[e].i18n,
//             dayjsLocale: dayjsLocaleMap[e].key,
//           });
//         }
//       },
//       mode(e) {
//         const t = this.getFullModeArray(e);
//         this.setData({
//           fullModes: t,
//         });
//         this.updateColumns();
//       },
//     };
//     this.date = null;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       columns: [],
//       columnsValue: [],
//       fullModes: [],
//       locale: dayjsLocaleMap[defaultLocale].i18n,
//       dayjsLocale: dayjsLocaleMap[defaultLocale].key,
//     });
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change',
//     }];
//     this.methods = {
//       updateColumns() {
//         this.date = this.getParseDate();
//         const {
//           columns: e,
//           columnsValue: t,
//         } = this.getValueCols();
//         this.setData({
//           columns: e,
//           columnsValue: t,
//         });
//       },
//       getDaysOfWeekInMonth(e) {
//         const {
//           locale: t,
//           dayjsLocale: a,
//         } = this;
//         const s = e.startOf('month');
//         const o = e.endOf('month');
//         const n = [];
//         for (let e = 0; e <= o.diff(s, 'days'); e += 1) {
//           const o = s.add(e, 'days').locale(a)
//             .format('ddd');
//           n.push({
//             value: `${e + 1}`,
//             label: `${e + 1}${t.date || ''} ${o}`,
//           });
//         }
//         return n;
//       },
//       getParseDate() {
//         const {
//           value: e,
//           defaultValue: t,
//         } = this;
//         const a = this.getMinDate();
//         let s = e || t;
//         if (this.isTimeMode()) {
//           const e = dayjs(a).format('YYYY-MM-DD');
//           s = dayjs(`${e} ${s}`);
//         }
//         const o = dayjs(s || a);
//         return o.isValid() ? o : a;
//       },
//       normalize: (e, t) => (e && dayjs(e).isValid() ? dayjs(e) : t),
//       getMinDate() {
//         return this.normalize(this.start, dayjs().subtract(10, 'year'));
//       },
//       getMaxDate() {
//         return this.normalize(this.end, dayjs().add(10, 'year'));
//       },
//       getDateRect(e = 'default') {
//         const t = this[{
//           min: 'getMinDate',
//           max: 'getMaxDate',
//           default: 'getDate',
//         }[e]]();
//         return ['year', 'month', 'date', 'hour', 'minute', 'second'].map((e) => {
//           let a;
//           return null === (a = t[e]) || void 0 === a ? void 0 : a.call(t);
//         });
//       },
//       getDate() {
//         return this.clipDate((null == this ? void 0 : this.date) || this.getMinDate());
//       },
//       clipDate(e) {
//         const t = this.getMinDate();
//         const a = this.getMaxDate();
//         return dayjs(Math.min(Math.max(t.valueOf(), e.valueOf()), a.valueOf()));
//       },
//       setYear(e, t) {
//         const a = e.date();
//         const s = e.year(t).daysInMonth();
//         return e.date(Math.min(a.valueOf(), s.valueOf())).year(t);
//       },
//       setMonth(e, t) {
//         const a = e.date();
//         const s = e.month(t).daysInMonth();
//         return e.date(Math.min(a.valueOf(), s.valueOf())).month(t);
//       },
//       getColumnOptions() {
//         const {
//           fullModes: e,
//           filter: t,
//         } = this;
//         const a = [];
//         null == e || e.forEach((e) => {
//           const s = this.getOptionByType(e);
//           'function' === typeof t ? a.push(t(e, s)) : a.push(s);
//         });
//         return a;
//       },
//       getOptionByType(e) {
//         let t;
//         const {
//           locale: a,
//           steps: s,
//           showWeek: o,
//         } = this;
//         const n = [];
//         const l = this.getOptionEdge('min', e);
//         const i = this.getOptionEdge('max', e);
//         const r = null !== (t = null == s ? void 0 : s[e]) && void 0 !== t ? t : 1;
//         const u = dayjs().locale(this.dayjsLocale)
//           .localeData()
//           .monthsShort();
//         if ('date' === e && o) {
//           return this.getDaysOfWeekInMonth(this.date);
//         }
//         for (let t = l; t <= i; t += r) {
//           n.push({
//             value: `${t}`,
//             label: 'month' === e ? u[t] : `${t + a[e]}`,
//           });
//         }
//         return n;
//       },
//       getYearOptions(e) {
//         const {
//           locale: t,
//         } = this;
//         const {
//           minDateYear: a,
//           maxDateYear: s,
//         } = e;
//         const o = [];
//         for (let e = a; e <= s; e += 1) {
//           o.push({
//             value: `${e}`,
//             label: `${e + t.year}`,
//           });
//         }
//         return o;
//       },
//       getOptionEdge(e, t) {
//         const a = this.getDateRect();
//         const s = this.getDateRect(e);
//         const o = {
//           month: [0, 11],
//           date: [1, this.getDate().daysInMonth()],
//           hour: [0, 23],
//           minute: [0, 59],
//           second: [0, 59],
//         };
//         const n = ['year', 'month', 'date', 'hour', 'minute', 'second'];
//         for (let l = 0, i = a.length; l < i; l += 1) {
//           if (n[l] === t) {
//             return s[l];
//           }
//           if (s[l] !== a[l]) {
//             return o[t]['min' === e ? 0 : 1];
//           }
//         }
//         return o[t]['min' === e ? 0 : 1];
//       },
//       getMonthOptions() {
//         const e = [];
//         const t = this.getOptionEdge('min', 'month');
//         const a = this.getOptionEdge('max', 'month');
//         const s = dayjs.monthsShort();
//         for (let o = t; o <= a; o += 1) {
//           e.push({
//             value: `${o}`,
//             label: s[o],
//           });
//         }
//         return e;
//       },
//       getDayOptions() {
//         const {
//           locale: e,
//         } = this;
//         const t = [];
//         const a = this.getOptionEdge('min', 'date');
//         const s = this.getOptionEdge('max', 'date');
//         for (let o = a; o <= s; o += 1) {
//           t.push({
//             value: `${o}`,
//             label: `${o + e.day}`,
//           });
//         }
//         return t;
//       },
//       getHourOptions() {
//         const {
//           locale: e,
//         } = this;
//         const t = [];
//         const a = this.getOptionEdge('min', 'hour');
//         const s = this.getOptionEdge('max', 'hour');
//         for (let o = a; o <= s; o += 1) {
//           t.push({
//             value: `${o}`,
//             label: `${o + e.hour}`,
//           });
//         }
//         return t;
//       },
//       getMinuteOptions() {
//         const {
//           locale: e,
//         } = this;
//         const t = [];
//         const a = this.getOptionEdge('min', 'minute');
//         const s = this.getOptionEdge('max', 'minute');
//         for (let o = a; o <= s; o += 1) {
//           t.push({
//             value: `${o}`,
//             label: `${o + e.minute}`,
//           });
//         }
//         return t;
//       },
//       getValueCols() {
//         return {
//           columns: this.getColumnOptions(),
//           columnsValue: this.getColumnsValue(),
//         };
//       },
//       getColumnsValue() {
//         const {
//           fullModes: e,
//         } = this;
//         const t = this.getDate();
//         const a = [];
//         null == e || e.forEach((e) => {
//           a.push(`${t[e]()}`);
//         });
//         return a;
//       },
//       getNewDate(e, t) {
//         let a = this.getDate();
//         switch (t) {
//           case ModeItem.YEAR:
//             a = this.setYear(a, e);
//             break;
//           case ModeItem.MONTH:
//             a = this.setMonth(a, e);
//             break;
//           case ModeItem.DATE:
//             a = a.date(e);
//             break;
//           case ModeItem.HOUR:
//             a = a.hour(e);
//             break;
//           case ModeItem.MINUTE:
//             a = a.minute(e);
//             break;
//           case ModeItem.SECOND:
//             a = a.second(e);
//         }
//         return this.clipDate(a);
//       },
//       onColumnChange(e) {
//         const {
//           value: t,
//           column: a,
//         } = null == e ? void 0 : e.detail;
//         const {
//           fullModes: s,
//           format: o,
//         } = this;
//         const n = null == t ? void 0 : t[a];
//         const l = null == s ? void 0 : s[a];
//         const i = this.getNewDate(parseInt(n, 10), l);
//         this.date = i;
//         const {
//           columns: r,
//           columnsValue: u,
//         } = this.getValueCols();
//         this.setData({
//           columns: r,
//           columnsValue: u,
//         });
//         const d = this.getDate();
//         const h = o ? d.format(o) : d.valueOf();
//         this.$emit('pick', {
//           detail: {
//             value: h,
//           },
//         });
//       },
//       onConfirm() {
//         const {
//           format: e,
//         } = this;
//         const t = this.getDate();
//         const a = e ? t.format(e) : t.valueOf();
//         this._trigger('change', {
//           value: a,
//         });
//         this.$emit('confirm', {
//           detail: {
//             value: a,
//           },
//         });
//         this.resetColumns();
//       },
//       onCancel() {
//         this.resetColumns();
//         this.$emit('cancel');
//       },
//       onVisibleChange(e) {
//         e.detail.visible || this.resetColumns();
//       },
//       onClose(e) {
//         const {
//           trigger: t,
//         } = e.detail;
//         this.$emit('close', {
//           detail: {
//             trigger: t,
//           },
//         });
//       },
//       resetColumns() {
//         const e = this.getParseDate();
//         this.date = e;
//         const {
//           columns: t,
//           columnsValue: a,
//         } = this.getValueCols();
//         this.setData({
//           columns: t,
//           columnsValue: a,
//         });
//       },
//     };
//   }
//   getFullModeArray(e) {
//     if ('string' === typeof e || e instanceof String) {
//       return this.getFullModeByModeString(e, FULL_MODES);
//     }
//     if (Array.isArray(e)) {
//       if (1 === (null == e ? void 0 : e.length)) {
//         return this.getFullModeByModeString(e[0], FULL_MODES);
//       }
//       if (2 === (null == e ? void 0 : e.length)) {
//         return [...this.getFullModeByModeString(e[0], DATE_MODES), ...this.getFullModeByModeString(e[1], TIME_MODES)];
//       }
//     }
//   }
//   getFullModeByModeString(e, t) {
//     if (!e) {
//       return [];
//     }
//     const a = null == t ? void 0 : t.findIndex(t => e === t);
//     return null == t ? void 0 : t.slice(0, a + 1);
//   }
//   isTimeMode() {
//     const {
//       fullModes: e,
//     } = this;
//     return e[0] === ModeItem.HOUR;
//   }
// };
// DateTimePicker = __decorate([wxComponent()], DateTimePicker);
// export default DateTimePicker;
</script>
<style scoped lang="less">
@import './date-time-picker.less';
</style>
