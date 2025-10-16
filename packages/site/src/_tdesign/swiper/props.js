const props = {
  autoplay: {
    type: Boolean,
    default: true,
  },
  current: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  displayMultipleItems: {
    type: Number,
    default: 1,
  },
  duration: {
    type: Number,
    default: 300,
  },
  easingFunction: {
    type: String,
    default: 'default',
  },
  height: {
    type: [String, Number],
    default: 192,
  },
  imageProps: {
    type: Object,
    default: () => ({}),
  },
  interval: {
    type: Number,
    default: 5000,
  },
  list: {
    type: Array,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: [Object, Boolean],
    default: true,
  },
  nextMargin: {
    type: [String, Number],
    default: 0,
  },
  paginationPosition: {
    type: String,
    default: 'bottom',
  },
  previousMargin: {
    type: [String, Number],
    default: 0,
  },
  snapToEdge: {
    type: Boolean,
    default: false,
  },
};
export default props;
