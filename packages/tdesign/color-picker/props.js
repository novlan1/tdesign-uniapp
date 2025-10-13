const props = {
  autoClose: {
    type: Boolean,
    default: true,
  },
  enableAlpha: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: 'RGB',
  },
  popupProps: {
    type: Object,
    value: () => ({}),
  },
  swatchColors: {
    type: Array,
  },
  type: {
    type: String,
    default: 'base',
  },
  usePopup: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: null,
  },
  defaultValue: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
};
export default props;
