const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  externalClasses: {
    type: Array,
    default: () => ([]),
  },
  keys: {
    type: [Object, null],
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => ([]),
  },
  optionsColumns: {
    type: [String, Number],
    default: 1,
  },
  placement: {
    type: String,
    default: 'left',
  },
  value: {
    type: [null, String, Number, Array],
    default: null,
  },
  defaultValue: {
    type: [null, String, Number, Array],
    default: null,
  },

  relationKey: {
    type: String,
    default: '',
  },
};
export default props;
