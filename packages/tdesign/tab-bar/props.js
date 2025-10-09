const props = {
  bordered: {
    type: Boolean,
    default: true,
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  fixed: {
    type: Boolean,
    default: true,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  shape: {
    type: String,
    default: 'normal',
  },
  split: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'normal',
  },
  value: {
    type: [null, String, Number, Array],
    default: null,
  },
  defaultValue: {
    type: [null, String, Number, Array],
    default: null,
  },
};
export default props;
