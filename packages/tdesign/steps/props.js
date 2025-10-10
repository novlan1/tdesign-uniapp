const props = {
  current: {
    type: [null, String, Number],
    default: null,
  },
  defaultCurrent: {
    type: [null, String, Number],
    default: null,
  },
  currentStatus: {
    type: String,
    default: 'process',
  },
  layout: {
    type: String,
    default: 'horizontal',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  sequence: {
    type: String,
    default: 'positive',
  },
  theme: {
    type: String,
    default: 'default',
  },
};
export default props;
