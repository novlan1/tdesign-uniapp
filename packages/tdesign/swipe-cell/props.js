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
    default: false,
  },
  right: {
    type: Array,
    default: () => ([]),
  },
  style: {
    type: String,
    default: '',
  },
};
export default props;
