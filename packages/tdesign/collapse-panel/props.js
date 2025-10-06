const props = {
  content: {
    type: String,
    default: '',
  },
  disabled: {
    type: [Boolean, null],
    default: null,
  },
  expandIcon: {
    type: [Boolean, null],
    default: null,
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
