const props = {
  actions: {
    type: Array,
    default: () => ([]),
  },
  buttonLayout: {
    type: String,
    default: 'horizontal',
  },
  cancelBtn: {
    type: [null, String, Object],
    default: null,
  },
  closeBtn: {
    type: [null, Boolean, Object],
    default: false,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: false,
  },
  confirmBtn: {
    type: [null, String, Object],
    default: null,
  },
  content: {
    type: String,
    default: '',
  },
  overlayProps: {
    type: Object,
    value: () => ({}),
  },
  preventScrollThrough: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 11500,
  },
};
export default props;
