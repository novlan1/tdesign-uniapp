const props = {
  disabled: {
    type: [Boolean, null],
    default: undefined,
  },
  label: {
    type: [String, Boolean, Function],
    default: false,
  },
  marks: {
    type: [Object, Array],
    value: () => ({}),
  },
  max: {
    type: Number,
    default: 100,
  },
  min: {
    type: Number,
    default: 0,
  },
  range: {
    type: Boolean,
    default: false,
  },
  showExtremeValue: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 1,
  },
  theme: {
    type: String,
    default: 'default',
  },
  value: {
    type: [null, Number, Array],
    default: null,
  },
  defaultValue: {
    type: [null, Number, Array],
    default: 0,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
};
export default props;
