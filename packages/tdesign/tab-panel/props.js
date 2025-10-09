const props = {
  badgeProps: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, Object],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  panel: {
    type: String,
    default: '',
  },
  value: {
    type: [null, String, Number],
    default: null,
  },
};
export default props;
