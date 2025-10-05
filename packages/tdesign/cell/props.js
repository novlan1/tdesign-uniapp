const props = {
  align: {
    type: String,
    default: 'middle',
  },
  arrow: {
    type: [Boolean, Object],
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  hover: {
    type: Boolean,
  },
  image: {
    type: String,
  },
  jumpType: {
    type: String,
    default: 'navigateTo',
  },
  leftIcon: {
    type: [String, Object],
    default: '',
  },
  note: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rightIcon: {
    type: [String, Object],
    default: '',
  },
  title: {
    type: String,
  },
  url: {
    type: String,
    default: '',
  },
};
export default props;
