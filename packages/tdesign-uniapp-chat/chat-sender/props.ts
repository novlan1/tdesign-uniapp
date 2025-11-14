/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

const props = {
    /** 默认键盘弹起不会把页面顶起来 */
    adjustPosition: {
        type: Boolean,
        default: false
    },
    /** 附件列表属性 */
    attachmentsProps: {
        type: Object
    },
    /** 键盘弹起时自动顶起来输入框 */
    autoRiseWithKeyboard: {
        type: Boolean,
        default: false
    },
    /** 是否禁用输入框 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 附件文件列表 */
    fileList: {
        type: Array,
        default: () => []
    },
    /** 发送按钮是否处于加载状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 输入框默认文案 */
    placeholder: {
        type: String,
        default: '请输入消息...'
    },
    /** 预设发送区渲染配置，用于灵活配置发送区的上传入口和发送按钮，支持自定义类型、顺序、样式 */
    renderPresets: {
        type: Array,
        default: () => [
            {
                name: 'upload',
                presets: ['uploadCamera', 'uploadImage', 'uploadAttachment'],
                status: ''
            },
            {
                name: 'send',
                type: 'icon'
            }
        ]
    },
    /** 透传给 Textarea 组件的属性，autosize数值单位为 rpx */
    textareaProps: {
        type: [Boolean, Object],
        default: () => ({
            autosize: {
                maxHeight: 264,
                minHeight: 48
            }
        })
    },
    /** 输入框的值 */
    value: {
        type: String,
        default: ''
    },
    /** 上传面板是否可见 */
    visible: {
        type: Boolean,
        default: false
    }
};
export default props;
