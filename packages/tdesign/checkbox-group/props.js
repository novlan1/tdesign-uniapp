const props = {
    borderless: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: null,
        default: void 0
    },
    keys: {
        type: Object
    },
    max: {
        type: Number,
        default: void 0
    },
    name: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: []
    },
    value: {
        type: Array,
        default: [],
    },
    defaultValue: {
        type: Array,
        default: [],
    }
};
export default props;
