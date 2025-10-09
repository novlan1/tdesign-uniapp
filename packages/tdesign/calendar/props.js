const props = {
    autoClose: {
        type: Boolean,
        default: true
    },
    confirmBtn: {
        type: null,
        default: ''
    },
    firstDayOfWeek: {
        type: Number,
        default: 0
    },
    format: {
        type: null
    },
    localeText: {
        type: Object
    },
    maxDate: {
        type: Number
    },
    minDate: {
        type: Number
    },
    switchMode: {
        type: String,
        default: 'none'
    },
    title: {
        type: String
    },
    type: {
        type: String,
        default: 'single'
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
