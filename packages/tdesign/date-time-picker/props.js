const props = {
    autoClose: {
        type: Boolean,
        default: false
    },
    cancelBtn: {
        type: String,
        default: '取消'
    },
    confirmBtn: {
        type: String,
        default: ''
    },
    customLocale: {
        type: String,
        default: 'zh'
    },
    end: {
        type: null
    },
    filter: {
        type: null
    },
    format: {
        type: String,
        default: 'YYYY-MM-DD HH:mm:ss'
    },
    formatter: {
        type: null
    },
    header: {
        type: Boolean,
        default: true
    },
    mode: {
        type: null,
        default: 'date'
    },
    popupProps: {
        type: Object,
        value: {}
    },
    showWeek: {
        type: Boolean,
        default: false
    },
    start: {
        type: null
    },
    steps: {
        type: Object
    },
    title: {
        type: String,
        default: ''
    },
    usePopup: {
        type: Boolean,
        default: true
    },
    value: {
        type: null,
        default: null
    },
    defaultValue: {
        type: null
    },
    visible: {
        type: Boolean,
        default: false
    }
};
export default props;
