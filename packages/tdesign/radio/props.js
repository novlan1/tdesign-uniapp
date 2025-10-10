const props = {
  allowUncheck: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: true,
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
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: false,
  },
};
export default props;
