const props = {
  disableInput: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  inputWidth: {
    type: Number,
  },
  integer: {
    type: Boolean,
    default: true,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  size: {
    type: String,
    default: 'medium',
  },
  step: {
    type: Number,
    default: 1,
  },
  theme: {
    type: String,
    default: 'normal',
  },
  value: {
    type: [String, Number, null],
    default: null,
  },
  defaultValue: {
    type: [String, Number, null],
    default: 0,
  },
};
export default props;
