const props = {
  borderless: {
    type: [Boolean, null],
    default: null,
  },
  disabled: {
    type: [null, Boolean],
    default: null,
  },
  keys: {
    type: Object,
  },
  max: {
    type: Number,
    default: void 0,
  },
  name: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: [],
  },
  value: {
    type: [Array, null],
    default: null,
  },
  defaultValue: {
    type: [Array, null],
    default: null,
  },
};
export default props;
