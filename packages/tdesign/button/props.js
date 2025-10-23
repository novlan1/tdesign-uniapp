const props = {
  appParameter: {
    type: String,
    default: '',
  },
  block: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
  },
  customDataset: {
    type: [Object, Array, String, Number, Boolean, null, undefined],
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  hoverClass: {
    type: String,
    default: '',
  },
  hoverStartTime: {
    type: Number,
    default: 20,
  },
  hoverStayTime: {
    type: Number,
    default: 70,
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, Object],
    default: '',
  },
  lang: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingProps: {
    type: Object,
    default: () => ({}),
  },
  openType: {
    type: String,
  },
  phoneNumberNoQuotaToast: {
    type: Boolean,
    default: true,
  },
  sendMessageImg: {
    type: String,
    default: '截图',
  },
  sendMessagePath: {
    type: String,
    default: '当前分享路径',
  },
  sendMessageTitle: {
    type: String,
    default: '当前标题',
  },
  sessionFrom: {
    type: String,
    default: '',
  },
  shape: {
    type: String,
    default: 'rectangle',
  },
  showMessageCard: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },
  style: {
    type: String,
    default: '',
  },
  tId: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
  },
  variant: {
    type: String,
    default: 'base',
  },
};
export default props;
