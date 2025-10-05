const props = {
  color: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  count: {
    type: [String, Number],
    default: 0,
  },
  dot: {
    type: Boolean,
    default: false,
  },
  externalClasses: {
    type: Array,
  },
  maxCount: {
    type: Number,
    default: 99,
  },
  offset: {
    type: Array,
    default: () => ([]),
  },
  shape: {
    type: String,
    default: 'circle',
  },
  showZero: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },
};
export default props;
