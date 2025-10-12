const props = {
  autoClose: {
    type: Boolean,
    default: true,
  },
  confirmBtn: {
    type: [String, Object],
    default: '',
  },
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  format: {
    type: [null, Function],
    default: null,
  },
  localeText: {
    type: Object,
  },
  maxDate: {
    type: Number,
  },
  minDate: {
    type: Number,
  },
  readonly: {
    type: Boolean,
  },
  switchMode: {
    type: String,
    default: 'none',
  },
  title: {
    type: String,
  },
  type: {
    type: String,
    default: 'single',
  },
  usePopup: {
    type: Boolean,
    default: true,
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [Number, Array, null],
    default: null,
  },
  defaultValue: {
    type: [Number, Array, null],
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
};
export default props;
