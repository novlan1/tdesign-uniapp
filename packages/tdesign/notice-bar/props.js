const props = {
  content: {
    type: [String, Array],
    default: '',
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  interval: {
    type: Number,
    default: 2000,
  },
  marquee: {
    type: [Boolean, Object],
    default: false,
  },
  operation: {
    type: String,
    default: '',
  },
  prefixIcon: {
    type: [String, Boolean, Object],
    default: true,
  },
  suffixIcon: {
    type: [String, Boolean, Object],
    default: '',
  },
  theme: {
    type: String,
    default: 'info',
  },
  visible: {
    type: Boolean,
    default: null,
  },
  defaultVisible: {
    type: Boolean,
    default: false,
  },
};
export default props;
