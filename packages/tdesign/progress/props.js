const props = {
  color: {
    type: [String, Object, Array],
    default: '',
  },
  label: {
    type: [String, Boolean],
    default: true,
  },
  percentage: {
    type: [Number, String],
    default: 0,
  },
  size: {
    type: [String, Number],
    default: 'default',
  },
  status: {
    type: String,
    default: '',
  },
  strokeWidth: {
    type: [String, Number],
    default: '',
  },
  theme: {
    type: String,
    default: 'line',
  },
  trackColor: {
    type: String,
    default: '',
  },
};
export default props;
