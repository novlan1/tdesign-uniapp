const props = {
    allowHalf: {
        type: Boolean,
        default: false
    },
    color: {
        type: null,
        default: '#ED7B2F'
    },
    count: {
        type: Number,
        default: 5
    },
    disabled: {
        type: null,
        default: void 0
    },
    gap: {
        type: null,
        default: 8
    },
    icon: {
        type: null
    },
    iconPrefix: {
        type: String,
        default: void 0
    },
    placement: {
        type: String,
        default: 'top'
    },
    showText: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: '24px'
    },
    texts: {
        type: Array,
        default: []
    },
    value: {
        type: Number,
        default: null
    },
    defaultValue: {
        type: Number,
        default: 0
    },
    variant: {
        type: String,
        default: 'outline'
    }
};
export default props;
