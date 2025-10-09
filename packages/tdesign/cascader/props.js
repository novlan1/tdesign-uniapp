const props = {
    checkStrictly: {
        type: Boolean,
        default: false
    },
    closeBtn: {
        type: Boolean,
        default: true
    },
    keys: {
        type: Object
    },
    options: {
        type: Array,
        default: []
    },
    placeholder: {
        type: String,
        default: '选择选项'
    },
    subTitles: {
        type: Array,
        default: []
    },
    theme: {
        type: String,
        default: 'step'
    },
    title: {
        type: String
    },
    value: {
        type: null,
        default: null
    },
    defaultValue: {
        type: null,
        default: null
    },
    visible: {
        type: Boolean,
        default: false
    }
};
export default props;
