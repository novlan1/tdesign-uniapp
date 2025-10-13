const props = {
  addBtn: {
    type: Boolean,
    default: true,
  },
  addContent: {
    type: String,
  },
  allowUploadDuplicateFile: {
    type: Boolean,
    default: false,
  },
  config: {
    type: Object,
  },
  disabled: {
    type: [Boolean, null],
    default: undefined,
  },
  draggable: {
    type: [Boolean, Object],
  },
  files: {
    type: [Array, null],
    default: null,
  },
  defaultFiles: {
    type: [Array, null],
    default: null,
  },
  gridConfig: {
    type: Object,
  },
  gutter: {
    type: Number,
    default: 16,
  },
  imageProps: {
    type: Object,
  },
  max: {
    type: Number,
    default: 0,
  },
  mediaType: {
    type: Array,
    default: () => ['image', 'video'],
  },
  preview: {
    type: Boolean,
    default: true,
  },
  removeBtn: {
    type: Boolean,
    default: true,
  },
  requestMethod: {
    type: [null, Function],
    default: null,
  },
  sizeLimit: {
    type: [Number, Object, null],
    default: null,
  },
  source: {
    type: String,
    default: 'media',
  },
  transition: {
    type: Object,
    default: () => ({
      backTransition: true,
      duration: 300,
      timingFunction: 'ease',
    }),
  },
};
export default props;
