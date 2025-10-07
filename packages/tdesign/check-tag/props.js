const props = {
  checked: {
    type: [Boolean, null],
    default: null,
  },
  defaultChecked: {
    type: [Boolean, null],
    default: null,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  content: {
    type: [String, Number, Array],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [null, String, Object],
    default: null,
  },
  shape: {
    type: String,
    default: 'square',
  },
  size: {
    type: String,
    default: 'medium',
  },
  variant: {
    type: String,
    default: 'dark',
  },
};
export default props;
