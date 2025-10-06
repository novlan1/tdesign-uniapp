const props = {
  alt: {
    type: String,
    default: '',
  },
  badgeProps: {
    type: Object,
    default: () => ({}),
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  hideOnLoadFailed: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [null, String, Object, Function],
    default: null,
  },
  image: {
    type: String,
    default: '',
  },
  imageProps: {
    type: Object,
    default: () => ({}),
  },
  shape: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
};
export default props;
