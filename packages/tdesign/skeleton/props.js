const props = {
    animation: {
        type: String,
        value: 'none'
    },
    delay: {
        type: Number,
        value: 0,
        default: 0
    },
    loading: {
        type: Boolean,
        value: true
    },
    rowCol: {
        type: Array,
        default: () => ([]),
        value: () => ([])
    },
    theme: {
        type: String,
        value: 'text'
    }
};
export default props;
