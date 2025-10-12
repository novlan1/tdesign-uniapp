const props = {
  autoClose: {
    type: Boolean,
    default: true,
  },
  cancelBtn: {
    type: [String, Boolean],
    default: true,
  },
  confirmBtn: {
    type: [String, Boolean],
    default: true,
  },
  header: {
    type: Boolean,
    default: true,
  },
  itemHeight: {
    type: Number,
    default: 80,
  },
  keys: {
    type: Object,
  },
  popupProps: {
    type: Object,
    value: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
  usePopup: {
    type: Boolean,
    default: true,
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [Array, null],
    default: null,
  },
  defaultValue: {
    type: [Array, null],
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
};
export default props;
