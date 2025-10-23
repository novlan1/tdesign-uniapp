const props = {
  backgroundColor: {
    type: String,
    default: '',
  },
  closeBtn: {
    type: [String, Boolean, Object],
    default: false,
  },
  deleteBtn: {
    type: [String, Boolean, Object],
    default: false,
  },
  images: {
    type: Array,
    default: () => ([]),
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  showIndex: {
    type: Boolean,
    default: false,
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
