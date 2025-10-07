const props = {
  closeBtn: {
    type: Boolean,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
  },
  duration: {
    type: Number,
    default: 240,
  },
  externalClasses: {
    type: Array,
  },
  overlayProps: {
    type: Object,
    value: {},
  },
  placement: {
    type: String,
    default: 'top',
  },
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: [Boolean, null],
    default: null,
  },
  defaultVisible: {
    type: [Boolean, null],
    default: null,
  },
  zIndex: {
    type: Number,
    default: 11500,
  },
};
export default props;
