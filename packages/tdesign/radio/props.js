const props = {
    allowUncheck: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: true
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
        type: Boolean,
        default: false
    },
    disabled: {
        type: null,
        default: void 0
    },
    icon: {
        type: null,
        default: 'circle'
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
        type: String
    },
    readonly: {
        type: null,
        default: void 0
    },
    value: {
        type: null,
        default: false
    }
};
export default props;
