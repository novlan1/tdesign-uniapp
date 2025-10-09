const props = {
  animation: {
    type: Object,
    default: () => ({}),
  },
  bottomLineMode: {
    type: String,
    default: 'fixed',
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  showBottomLine: {
    type: Boolean,
    default: true,
  },
  spaceEvenly: {
    type: Boolean,
    default: true,
  },
  split: {
    type: Boolean,
    default: true,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  stickyProps: {
    type: [Object, null],
    default: null,
  },
  swipeable: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'line',
  },
  value: {
    type: [String, Number, null],
    default: null,
  },
  defaultValue: {
    type: [String, Number, null],
    default: null,
  },
};
export default props;
