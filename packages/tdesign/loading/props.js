const props = {
  delay: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 800,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  inheritColor: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: 'horizontal',
  },
  loading: {
    type: Boolean,
    default: true,
  },
  pause: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
  },
  reverse: {
    type: Boolean,
  },
  size: {
    type: String,
    default: '20px',
  },
  text: {
    type: String,
  },
  theme: {
    type: String,
    default: 'circular',
  },
};
export default props;
