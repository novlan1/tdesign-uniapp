const props = {
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: [null, String, Object, Boolean, Function],
    default: true,
  },
  image: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'default',
  },
  title: {
    type: String,
    default: '',
  },
};
export default props;
