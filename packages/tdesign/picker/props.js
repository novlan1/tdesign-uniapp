const props = {
    autoClose: {
        type: Boolean,
        default: true
    },
    cancelBtn: {
        type: null,
        default: true
    },
    confirmBtn: {
        type: null,
        default: true
    },
    header: {
        type: Boolean,
        default: true
    },
    itemHeight: {
        type: Number,
        default: 80
    },
    keys: {
        type: Object
    },
    popupProps: {
        type: Object,
        value: {}
    },
    title: {
        type: String,
        default: ''
    },
    usePopup: {
        type: Boolean,
        default: true
    },
    usingCustomNavbar: {
        type: Boolean,
        default: false
    },
    value: {
        type: Array,
        default: null
    },
    defaultValue: {
        type: Array
    },
    visible: {
        type: Boolean,
        default: false
    }
};
export default props;
