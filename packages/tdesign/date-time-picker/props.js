const props = {
  autoClose: {
    type: Boolean,
    default: false,
  },
  cancelBtn: {
    type: String,
    default: '取消',
  },
  confirmBtn: {
    type: String,
    default: '',
  },
  customLocale: {
    type: String,
    default: 'zh',
  },
  end: {
    type: [null, String, Number],
    default: null,
  },
  filter: {
    type: [Function, null],
    default: null,
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
  formatter: {
    type: [Function, null],
    default: null,
  },
  header: {
    type: Boolean,
    default: true,
  },
  mode: {
    type: [String, Array],
    default: 'date',
  },
  popupProps: {
    type: Object,
    value: () => ({}),
  },
  showWeek: {
    type: Boolean,
    default: false,
  },
  start: {
    type: [String, Number, null],
    default: null,
  },
  steps: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
  usePopup: {
    type: Boolean,
    default: true,
  },
  value: {
    type: [String, Number, null],
    default: null,
  },
  defaultValue: {
    type: [String, Number, null],
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
};
export default props;
