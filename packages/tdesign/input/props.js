const props = {
    adjustPosition: {
        type: Boolean,
        default: true
    },
    align: {
        type: String,
        default: 'left'
    },
    allowInputOverMax: {
        type: Boolean,
        default: false
    },
    alwaysEmbed: {
        type: Boolean,
        default: false
    },
    autoFocus: {
        type: Boolean,
        default: false
    },
    borderless: {
        type: Boolean,
        default: false
    },
    clearTrigger: {
        type: String,
        default: 'always'
    },
    clearable: {
        type: null,
        default: false
    },
    confirmHold: {
        type: Boolean,
        default: false
    },
    confirmType: {
        type: String,
        default: 'done'
    },
    cursor: {
        type: Number,
        default: -1,
        required: true
    },
    cursorColor: {
        type: String,
        default: '#0052d9'
    },
    cursorSpacing: {
        type: Number,
        default: 0
    },
    disabled: {
        type: null,
        default: void 0
    },
    focus: {
        type: Boolean,
        default: false
    },
    format: {
        type: null
    },
    holdKeyboard: {
        type: Boolean,
        default: false
    },
    label: {
        type: String
    },
    layout: {
        type: String,
        default: 'horizontal'
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
        default: 'input-placeholder'
    },
    placeholderStyle: {
        type: String,
        default: '',
        required: true
    },
    prefixIcon: {
        type: null
    },
    readonly: {
        type: null,
        default: void 0
    },
    safePasswordCertPath: {
        type: String,
        default: ''
    },
    safePasswordCustomHash: {
        type: String,
        default: ''
    },
    safePasswordLength: {
        type: Number
    },
    safePasswordNonce: {
        type: String,
        default: ''
    },
    safePasswordSalt: {
        type: String,
        default: ''
    },
    safePasswordTimeStamp: {
        type: Number
    },
    selectionEnd: {
        type: Number,
        default: -1
    },
    selectionStart: {
        type: Number,
        default: -1
    },
    status: {
        type: String,
        default: 'default'
    },
    suffix: {
        type: String
    },
    suffixIcon: {
        type: null
    },
    tips: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    value: {
        type: null
    }
};
export default props;
