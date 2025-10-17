/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
// 当前暂未支持导入type
// import { TdQRCodeProps } from './type';
// const props: TdQRCodeProps = {
const props = {
  // 二维码背景颜色
  bgColor: {
    type: String,
    default: '',
  },
  // 是否有边框
  borderless: {
    type: Boolean,
    default: false,
  },
  // 二维码颜色
  color: {
    type: String,
    default: '',
  },
  // 二维码中图片的地址
  icon: {
    type: String,
    default: '',
  },
  // 二维码中图片的大小
  iconSize: {
    type: [Number, Object],
    default: 40,
  },
  // 二维码纠错等级
  level: {
    type: String,
    default: 'M',
    validator: (value) => ['L', 'M', 'Q', 'H'].includes(value),
  },
  // 二维码大小
  size: {
    type: Number,
    default: 160,
  },
  // 二维码状态
  status: {
    type: String,
    default: 'active',
    validator: (value) => ['active', 'expired', 'loading', 'scanned'].includes(value),
  },
  // 扫描后的文本
  value: {
    type: String,
    default: '',
  },
  // 状态渲染
  statusRender: {
    type: Boolean,
    default: false,
  },
};

export default props;
