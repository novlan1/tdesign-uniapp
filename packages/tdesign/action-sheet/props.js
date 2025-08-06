const props = {
    align: {
        type: String,
        value: 'center'
    },
    cancelText: {
        type: String,
        value: ''
    },
    count: {
        type: Number,
        value: 8
    },
    description: {
        type: String,
        value: ''
    },
    items: {
        type: Array,
        required: true
    },
    popupProps: {
        type: Object,
        value: {}
    },
    showCancel: {
        type: Boolean,
        value: true
    },
    showOverlay: {
        type: Boolean,
        value: true
    },
    theme: {
        type: String,
        value: 'list'
    },
    usingCustomNavbar: {
        type: Boolean,
        value: false
    },
    visible: {
        type: Boolean,
        value: null
    },
    defaultVisible: {
        type: Boolean,
        value: false
    }
};
export default props;
