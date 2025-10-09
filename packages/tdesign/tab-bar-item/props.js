const props = {
  badgeProps: {
    type: Object,
    default: () => ({}),
  },
  icon: {
    type: [String, Object],
    default: '',
  },
  subTabBar: {
    type: Array,
    default: () => ([]),
  },
  value: {
    type: [String, Number],
    default: '',
  },
};
export default props;
