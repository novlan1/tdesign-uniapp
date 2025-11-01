const props = {
  align: {
    type: String,
    default: 'center',
  },
  border: {
    type: [null, Boolean, Object],
    default: false,
  },
  column: {
    type: Number,
    default: 4,
  },
  gutter: {
    type: Number,
    default: 0,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'default',
  },
};
export default props;
