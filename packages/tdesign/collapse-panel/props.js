const props = {
  content: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  expandIcon: {
    type: Boolean,
    default: false,
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  header: {
    type: String,
    default: '',
  },
  headerLeftIcon: {
    type: String,
    default: '',
  },
  headerRightContent: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'bottom',
  },
  value: {
    type: [String, Number],
    default: '',
  },
};
export default props;
