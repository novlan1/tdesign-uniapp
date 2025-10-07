const props = {
  closable: {
    type: [Object, Boolean],
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  icon: {
    type: [null, String, Object],
    default: null,
  },
  maxWidth: {
    type: [String, Number],
    default: '',
  },
  shape: {
    type: String,
    default: 'square',
  },
  size: {
    type: String,
    default: 'medium',
  },
  theme: {
    type: String,
    default: 'default',
  },
  variant: {
    type: String,
    default: 'dark',
  },
};
export default props;
