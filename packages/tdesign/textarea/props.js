const props = {
    adjustPosition: {
        type: Boolean,
        default: true
    },
    allowInputOverMax: {
        type: Boolean,
        default: false
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    autosize: {
        type: null,
        default: false
    },
    bordered: {
        type: Boolean,
        default: false
    },
    confirmHold: {
        type: Boolean,
        default: false
    },
    confirmType: {
        type: String,
        default: 'return'
    },
    cursor: {
        type: Number,
        default: -1
    },
    cursorSpacing: {
        type: Number,
        default: 0
    },
    disableDefaultPadding: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: null,
        default: void 0
    },
    fixed: {
        type: Boolean,
        default: false
    },
    focus: {
        type: Boolean,
        default: false
    },
    holdKeyboard: {
        type: Boolean,
        default: false
    },
    indicator: {
        type: Boolean,
        default: false
    },
    label: {
        type: String
    },
    maxcharacter: {
        type: Number
    },
    maxlength: {
        type: Number,
        default: -1
    },
    placeholder: {
        type: String,
        default: void 0
    },
    placeholderClass: {
        type: String,
        default: 'textarea-placeholder'
    },
    placeholderStyle: {
        type: String,
        default: ''
    },
    readonly: {
        type: null,
        default: void 0
    },
    selectionEnd: {
        type: Number,
        default: -1
    },
    selectionStart: {
        type: Number,
        default: -1
    },
    showConfirmBar: {
        type: Boolean,
        default: true
    },
    value: {
        type: null,
        default: null
    },
    defaultValue: {
        type: null
    }
};
export default props;
