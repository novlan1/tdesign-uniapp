const props = {
  arrowIcon: {
    type: [String, Object],
    default: 'caret-down-small',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [String, Number],
    default: 200,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 11600,
  },

  relationKey: {
    type: String,
    default: '',
  },
};
export default props;
