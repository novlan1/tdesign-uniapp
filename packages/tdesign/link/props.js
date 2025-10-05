const props = {
  content: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
  },
  navigatorProps: {
    type: Object,
    default: () => ({}),
  },
  prefixIcon: {
    type: null,
  },
  size: {
    type: String,
    default: 'medium',
  },
  suffixIcon: {
    type: null,
  },
  theme: {
    type: String,
    default: 'default',
  },
  underline: {
    type: Boolean,
  },
};
export default props;
