const props = {
  action: {
    type: String,
    default: '',
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  alwaysEmbed: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  clearTrigger: {
    type: String,
    default: 'always',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  confirmHold: {
    type: Boolean,
    default: false,
  },
  confirmType: {
    type: String,
    default: 'search',
  },
  cursor: {
    type: Number,
    default: -1,
  },
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  focus: {
    type: Boolean,
    default: false,
  },
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  leftIcon: {
    type: String,
    default: 'search',
  },
  maxcharacter: {
    type: Number,
  },
  maxlength: {
    type: Number,
    default: -1,
  },
  placeholder: {
    type: String,
    default: '',
  },
  placeholderClass: {
    type: String,
    default: 'input-placeholder',
  },
  placeholderStyle: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: undefined,
  },
  resultList: {
    type: Array,
    default: [],
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  shape: {
    type: String,
    default: 'square',
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
};
export default props;
