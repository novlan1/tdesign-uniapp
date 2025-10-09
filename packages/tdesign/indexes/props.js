const props = {
  current: {
    type: [null, String, Number],
    default: null,
  },
  defaultCurrent: {
    type: [null, String, Number],
    default: null,
  },
  indexList: {
    type: Array,
    default: () => ([]),
  },
  sticky: {
    type: Boolean,
    default: true,
  },
  stickyOffset: {
    type: Number,
    default: 0,
  },
};
export default props;
