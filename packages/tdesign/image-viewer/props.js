const props = {
    backgroundColor: {
        type: String,
        default: 'rgba(0, 0, 0, 1)'
    },
    closeBtn: {
        type: null,
        default: false
    },
    deleteBtn: {
        type: null,
        default: false
    },
    images: {
        type: Array,
        default: []
    },
    initialIndex: {
        type: Number,
        default: 0
    },
    lazy: {
        type: Boolean,
        default: true
    },
    showIndex: {
        type: Boolean,
        default: false
    },
    usingCustomNavbar: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: null
    },
    defaultVisible: {
        type: Boolean,
        default: false
    }
};
export default props;
