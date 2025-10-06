const props = {
  links: {
    type: Array,
    default: () => ([]),
  },
  logo: {
    type: Object,
    default: () => ({}),
  },
  text: {
    type: String,
    default: '',
  },
};
export default props;
