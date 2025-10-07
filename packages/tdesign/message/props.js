const props = {
  align: {
    type: String,
    default: 'left',
  },
  closeBtn: {
    type: [String, Boolean, Object],
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  gap: {
    type: [String, Number, Boolean],
    default: 12,
  },
  icon: {
    type: [String, Boolean, Object],
    default: true,
  },
  link: {
    type: [String, Object],
    default: '',
  },
  marquee: {
    type: [Boolean, Object],
    default: false,
  },
  offset: {
    type: Array,
    default: () => ([]),
  },
  single: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'info',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  defaultVisible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 15000,
  },
};
export default props;
