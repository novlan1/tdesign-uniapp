const props = {
  block: {
    type: Boolean,
    default: true,
  },
  borderless: {
    type: [Boolean, null],
    default: null,
  },
  checkAll: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: [Boolean, null],
    default: null,
  },
  defaultChecked: {
    type: [Boolean, null],
    default: null,
  },
  content: {
    type: String,
    default: '',
  },
  contentDisabled: {
    type: Boolean,
  },
  disabled: {
    type: [null, Boolean],
    default: null,
  },
  icon: {
    type: [String, Array],
    default: 'circle',
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  maxContentRow: {
    type: Number,
    default: 5,
  },
  maxLabelRow: {
    type: Number,
    default: 3,
  },
  name: {
    type: String,
    default: '',
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
    type: [String, Number, Boolean],
  },
};
export default props;
