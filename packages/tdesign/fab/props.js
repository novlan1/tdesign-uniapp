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

  customStyle: {
    type: [String, Object],
    default: '',
  },
};
export default props;
