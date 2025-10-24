const props = {
  backButtonProps: {
    type: Object,
    default: () => ({}),
  },
  counter: {
    type: [String, Function],
    default: '',
  },
  current: {
    type: [Number, String, null],
    default: null,
  },
  defaultCurrent: {
    type: [Number, String, null],
    default: null,
  },
  finishButtonProps: {
    type: Object,
    default: () => ({}),
  },
  hideBack: {
    type: Boolean,
    default: false,
  },
  hideCounter: {
    type: Boolean,
    default: false,
  },
  hideSkip: {
    type: Boolean,
    default: false,
  },
  highlightPadding: {
    type: Number,
    default: 16,
  },
  mode: {
    type: String,
    default: 'popover',
  },
  nextButtonProps: {
    type: Object,
    default: () => ({}),
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  skipButtonProps: {
    type: Object,
    default: () => ({}),
  },
  steps: {
    type: Array,
    default: () => ([]),
  },
  usingCustomNavbar: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 999999,
  },
};
export default props;
