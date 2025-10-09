const props = {
    disabled: {
        type: null,
        default: void 0
    },
    label: {
        type: null,
        default: false
    },
    marks: {
        type: null,
        value: {}
    },
    max: {
        type: Number,
        default: 100
    },
    min: {
        type: Number,
        default: 0
    },
    range: {
        type: Boolean,
        default: false
    },
    showExtremeValue: {
        type: Boolean,
        default: false
    },
    step: {
        type: Number,
        default: 1
    },
    theme: {
        type: String,
        default: 'default'
    },
    value: {
        type: null,
        default: null
    },
    defaultValue: {
        type: null,
        default: 0
    },
    vertical: {
        type: Boolean,
        default: false
    }
};
export default props;
