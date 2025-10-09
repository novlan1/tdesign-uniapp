const props = {
  align: {
    type: String,
    default: 'center',
  },
  cancelText: {
    type: String,
    default: '',
  },
  count: {
    type: Number,
    default: 8,
  },
  description: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    required: true,
    default: () => ([]),
  },
  popupProps: {
    type: Object,
    default: () => ({}),
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'list',
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
};
export default props;
