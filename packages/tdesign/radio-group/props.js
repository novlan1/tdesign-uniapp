const props = {
    allowUncheck: {
        type: Boolean,
        default: false
    },
    borderless: {
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
    keys: {
        type: Object
    },
    name: {
        type: String,
        default: ''
    },
    options: {
        type: Array
    },
    placement: {
        type: String,
        default: 'left'
    },
    readonly: {
        type: null,
        default: void 0
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
