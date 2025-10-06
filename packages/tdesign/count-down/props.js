const props = {
  autoStart: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
    default: 'default',
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  millisecond: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },
  splitWithUnit: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'default',
  },
  time: {
    type: Number,
    default: 0,
    required: true,
  },
};
export default props;
