const props = {
  animation: {
    type: String,
    default: 'none',
  },
  delay: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  rowCol: {
    type: Array,
    default: () => ([]),
  },
  theme: {
    type: String,
    default: 'text',
  },
};
export default props;
