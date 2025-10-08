const props = {
  disabled: {
    type: Boolean,
  },
  left: {
    type: Array,
    default: () => ([]),
  },
  opened: {
    type: [Boolean, Array],
    value: false,
  },
  right: {
    type: Array,
    default: () => ([]),
  },
  style: {
    type: String,
    value: '',
  },
};
export default props;
