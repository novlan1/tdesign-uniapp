const props = {
  direction: {
    type: String,
    default: 'row',
  },
  duration: {
    type: Number,
    default: 2000,
  },
  icon: {
    type: [null, String, Object],
    default: null,
  },
  message: {
    type: String,
    default: '',
  },
  overlayProps: {
    type: [Object, null],
    default: null,
  },
  placement: {
    type: String,
    default: 'middle',
  },
  preventScrollThrough: {
    type: Boolean,
    default: false,
  },
  showOverlay: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: '',
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
};
export default props;
