const props = {
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  closeBtn: {
    type: Boolean,
    default: true,
  },
  keys: {
    type: Object,
  },
  options: {
    type: Array,
    default: [],
  },
  placeholder: {
    type: String,
    default: '选择选项',
  },
  subTitles: {
    type: Array,
    default: [],
  },
  theme: {
    type: String,
    default: 'step',
  },
  title: {
    type: String,
    default: '',
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
