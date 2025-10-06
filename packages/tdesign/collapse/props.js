const props = {
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: [Boolean, null],
    default: null,
  },
  expandIcon: {
    type: [Boolean, null],
    default: null,
  },
  expandMutex: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'default',
  },
  value: {
    type: [Array, null],
    default: null,
  },
  defaultValue: {
    type: Array,
    default: () => ([]),
  },
};
export default props;
