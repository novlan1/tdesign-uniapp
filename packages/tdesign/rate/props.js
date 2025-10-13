const props = {
  allowHalf: {
    type: Boolean,
    default: false,
  },
  color: {
    type: [String, Array],
    default: '#ED7B2F',
  },
  count: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  gap: {
    type: [String, Number],
    default: 8,
  },
  icon: {
    type: [String, Array],
    default: undefined,
  },
  iconPrefix: {
    type: String,
    default: undefined,
  },
  placement: {
    type: String,
    default: 'top',
  },
  showText: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [String, Number],
    default: '24px',
  },
  texts: {
    type: Array,
    default: () => [],
  },
  value: {
    type: [Number, null],
    default: null,
  },
  defaultValue: {
    type: [Number, null],
    default: 0,
  },
  variant: {
    type: String,
    default: 'outline',
  },
};
export default props;
