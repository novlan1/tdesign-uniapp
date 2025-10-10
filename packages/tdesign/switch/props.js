const props = {
  customValue: {
    type: Array,
    default: () => ([true, false]),
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  icon: {
    type: Array,
    default: () => [],
  },
  label: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
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
