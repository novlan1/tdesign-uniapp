const props = {
  error: {
    type: String,
    default: 'default',
  },
  height: {
    type: [String, Number],
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: String,
    default: 'default',
  },
  mode: {
    type: String,
    default: 'scaleToFill',
  },
  shape: {
    type: String,
    default: 'square',
  },
  showMenuByLongpress: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: '',
  },
  tId: {
    type: String,
    default: '',
  },
  webp: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [String, Number],
    default: '',
  },
};
export default props;
