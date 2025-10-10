const props = {
  badgeProps: {
    type: [Object, null],
    default: null,
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
  value: {
    type: [null, String, Number],
    default: null,
  },
};
export default props;
