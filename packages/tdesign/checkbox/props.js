const props = {
    block: {
        type: Boolean,
        default: true
    },
    borderless: {
        type: Boolean,
        default: false
    },
    checkAll: {
        type: Boolean,
        default: false
    },
    checked: {
        type: Boolean,
        default: null
    },
    defaultChecked: {
        type: Boolean,
        default: false
    },
    content: {
        type: String
    },
    contentDisabled: {
        type: Boolean
    },
    disabled: {
        type: null,
        default: void 0
    },
    icon: {
        type: null,
        default: 'circle'
    },
    indeterminate: {
        type: Boolean,
        default: false
    },
    label: {
        type: String
    },
    maxContentRow: {
        type: Number,
        default: 5
    },
    maxLabelRow: {
        type: Number,
        default: 3
    },
    name: {
        type: String,
        default: ''
    },
    placement: {
        type: String,
        default: 'left'
    },
    readonly: {
        type: Boolean,
        default: false
    },
    value: {
        type: null
    }
};
export default props;
