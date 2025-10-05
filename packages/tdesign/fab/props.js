const props = {
  buttonProps: {
    type: Object,
    default: () => ({}),
  },
  draggable: {
    type: [Boolean, String],
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  style: {
    type: String,
    default: 'right: 16px; bottom: 32px;',
  },
  text: {
    type: String,
    default: '',
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  yBounds: {
    type: Array,
    default: () => ([]),
  },

  tClass: {
    type: String,
    default: '',
  },
  tClassButton: {
    type: String,
    default: '',
  },
  customStyle: {
    type: String,
    default: '',
  },
};
export default props;
