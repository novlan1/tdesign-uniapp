const props = {
  current: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  minShowNum: {
    type: Number,
    default: 2,
  },
  paginationPosition: {
    type: String,
    default: 'bottom',
  },
  showControls: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'dots',
  },
};
export default props;
