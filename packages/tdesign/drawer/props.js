const props = {
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => ([]),
  },
  placement: {
    type: String,
    default: 'right',
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
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
