/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */


export default {
  /** 是否在点击外部元素后关闭菜单  */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  /** 确认框内容 */
  content: {
    type: String,
  },
  /** 浮层出现位置 */
  placement: {
    type: String,
    default: 'top',
  },
  /** 是否显示浮层箭头 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 弹出气泡主题 */
  theme: {
    type: String,
    default: 'dark',
  },
  /** 是否显示气泡确认框 */
  visible: {
    type: [Boolean, null],
    default: null,
  },
  /** 是否显示气泡确认框，非受控属性 */
  defaultVisible: {
    type: Boolean,
  },
};

