const props = {
  allowUncheck: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, Array],
    default: 'circle',
  },
  keys: {
    type: [Object, null],
    default: null,
  },
  name: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => ([]),
  },
  placement: {
    type: String,
    default: 'left',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [null, String, Number, Boolean],
    default: null,
  },
  defaultValue: {
    type: [null, String, Number, Boolean],
    default: null,
  },
};
export default props;
