const props = {
  description: {
    type: String,
    default: '',
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  icon: {
    type: [null, String, Object, Function],
    default: null,
  },
  image: {
    type: String,
    default: '',
  },
};
export default props;
