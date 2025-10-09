const props = {
    current: {
        type: null,
        default: null
    },
    defaultCurrent: {
        type: null
    },
    currentStatus: {
        type: String,
        default: 'process'
    },
    layout: {
        type: String,
        default: 'horizontal'
    },
    readonly: {
        type: Boolean,
        default: false
    },
    sequence: {
        type: String,
        default: 'positive'
    },
    theme: {
        type: String,
        default: 'default'
    }
};
export default props;
