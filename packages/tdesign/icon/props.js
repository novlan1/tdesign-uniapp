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
    type: null,
  },
  tClass: {
    type: String,
    default: '',
  },
  extraClass: {
    type: String,
    default: '',
  },
};
export default props;
