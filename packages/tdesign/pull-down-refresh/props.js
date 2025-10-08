const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  enableBackToTop: {
    type: Boolean,
    default: true,
  },
  enablePassive: {
    type: Boolean,
    default: false,
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  loadingBarHeight: {
    type: [String, Number],
    default: 50,
  },
  loadingProps: {
    type: Object,
    default: () => ({}),
  },
  loadingTexts: {
    type: Array,
    default: () => ([]),
  },
  lowerThreshold: {
    type: [String, Number],
    default: 50,
  },
  maxBarHeight: {
    type: [String, Number],
    default: 80,
  },
  refreshTimeout: {
    type: Number,
    default: 3000,
  },
  scrollIntoView: {
    type: String,
    default: '',
  },
  showScrollbar: {
    type: Boolean,
    default: true,
  },
  upperThreshold: {
    type: [String, Number],
    default: 50,
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Boolean,
    default: null,
  },
  defaultValue: {
    type: Boolean,
    default: false,
  },
};
export default props;
