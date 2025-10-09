const props = {
    customValue: {
        type: Array,
        default: [true, false]
    },
    disabled: {
        type: null,
        default: void 0
    },
    icon: {
        type: Array,
        default: []
    },
    label: {
        type: Array,
        default: []
    },
    loading: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'medium'
    },
    value: {
        type: null,
        default: null
    },
    defaultValue: {
        type: null,
        default: null
    }
};
export default props;
