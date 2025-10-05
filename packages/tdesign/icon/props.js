const props = {
  color: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
    required: true,
  },
  prefix: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: '',
  },
  tClass: {
    type: String,
    default: '',
  },
  extraClass: {
    type: String,
    default: '',
  },
  style: {
    type: String,
    default: '',
  },
};
export default props;
