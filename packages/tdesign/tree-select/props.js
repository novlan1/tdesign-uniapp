const props = {
  customValue: {
    type: [null, String, Number, Array],
    default: null,
  },
  height: {
    type: [String, Number],
    default: 336,
  },
  keys: {
    type: Object,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
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
