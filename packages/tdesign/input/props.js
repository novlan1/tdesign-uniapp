const props = {
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  align: {
    type: String,
    default: 'left',
  },
  allowInputOverMax: {
    type: Boolean,
    default: false,
  },
  alwaysEmbed: {
    type: Boolean,
    default: false,
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: false,
  },
  clearTrigger: {
    type: String,
    default: 'always',
  },
  clearable: {
    type: [Boolean, Object],
    default: false,
  },
  confirmHold: {
    type: Boolean,
    default: false,
  },
  confirmType: {
    type: String,
    default: 'done',
  },
  cursor: {
    type: Number,
    default: -1,
    required: true,
  },
  cursorColor: {
    type: String,
    default: '#0052d9',
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
  format: {
    type: [null, Function],
    default: null,
  },
  holdKeyboard: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  layout: {
    type: String,
    default: 'horizontal',
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
    default: void 0,
  },
  placeholderClass: {
    type: String,
    default: 'input-placeholder',
  },
  placeholderStyle: {
    type: String,
    default: '',
    required: true,
  },
  prefixIcon: {
    type: [String, Object],
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  safePasswordCertPath: {
    type: String,
    default: '',
  },
  safePasswordCustomHash: {
    type: String,
    default: '',
  },
  safePasswordLength: {
    type: Number,
  },
  safePasswordNonce: {
    type: String,
    default: '',
  },
  safePasswordSalt: {
    type: String,
    default: '',
  },
  safePasswordTimeStamp: {
    type: Number,
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  status: {
    type: String,
    default: 'default',
  },
  suffix: {
    type: String,
    default: '',
  },
  suffixIcon: {
    type: [String, Object],
    default: '',
  },
  tips: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: [String, Number],
    default: undefined,
  },
  defaultValue: {
    type: [String, Number],
    default: undefined,
  },
};
export default props;
