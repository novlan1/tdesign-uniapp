const props = {
  container: {
    type: [null, Function],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  offsetTop: {
    type: [String, Number],
    default: 0,
  },
  zIndex: {
    type: Number,
    default: 99,
  },
};
export default props;
