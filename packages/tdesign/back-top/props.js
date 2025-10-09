const props = {
  fixed: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: [Boolean, String, Object],
    default: true,
  },
  scrollTop: {
    type: Number,
    default: 0,
  },
  style: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'round',
  },
  visibilityHeight: {
    type: Number,
    default: 200,
  },
};
export default props;
