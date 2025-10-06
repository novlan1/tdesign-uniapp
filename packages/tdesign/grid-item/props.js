const props = {
  badgeProps: {
    type: Object,
    default: () => ({}),
  },
  description: {
    type: String,
    default: '',
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
  jumpType: {
    type: String,
    default: 'navigate-to',
  },
  layout: {
    type: String,
    default: 'vertical',
  },
  text: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
};
export default props;
