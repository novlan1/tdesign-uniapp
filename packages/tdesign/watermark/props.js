const props = {
  alpha: {
    type: Number,
    default: 1,
  },
  content: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
  },
  isRepeat: {
    type: Boolean,
    default: true,
  },
  layout: {
    type: String,
    default: 'rectangular',
  },
  lineSpace: {
    type: Number,
    default: 16,
  },
  movable: {
    type: Boolean,
    default: false,
  },
  moveInterval: {
    type: Number,
    default: 3000,
  },
  offset: {
    type: Array,
    default: [],
  },
  removable: {
    type: Boolean,
    default: true,
  },
  rotate: {
    type: Number,
    default: -22,
  },
  watermarkContent: {
    type: null,
    default: null,
  },
  width: {
    type: Number,
    default: 0,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  zIndex: {
    type: Number,
    default: 0,
  },
};
export default props;
