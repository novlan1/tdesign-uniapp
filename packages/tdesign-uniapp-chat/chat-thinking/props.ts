/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

const props = {
    /** 内容区域最大高度，超出会自动滚动 */
    animation: {
        type: String,
        default: 'moving'
    },
    /** 是否折叠 */
    collapsed: {
        type: Boolean,
        default: false
    },
    /** 思考内容对象 */
    content: {
        type: Object,
        default: () => ({})
    },
    /** 布局方式 */
    layout: {
        type: String,
        default: 'block'
    },
    /** 内容区域最大高度，超出会自动滚动 */
    maxHeight: {
        type: Number
    },
    /** 思考状态 */
    status: {
        type: String,
        default: 'pending',
    }
};
export default props;
