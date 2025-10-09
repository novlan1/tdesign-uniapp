const props = {
    backButtonProps: {
        type: Object
    },
    counter: {
        type: null
    },
    current: {
        type: Number,
        default: null
    },
    defaultCurrent: {
        type: Number
    },
    finishButtonProps: {
        type: Object
    },
    hideBack: {
        type: Boolean,
        default: false
    },
    hideCounter: {
        type: Boolean,
        default: false
    },
    hideSkip: {
        type: Boolean,
        default: false
    },
    highlightPadding: {
        type: Number,
        default: 16
    },
    mode: {
        type: String,
        default: 'popover'
    },
    nextButtonProps: {
        type: Object
    },
    showOverlay: {
        type: Boolean,
        default: true
    },
    skipButtonProps: {
        type: Object
    },
    steps: {
        type: Array
    },
    usingCustomNavbar: {
        type: Boolean,
        default: false
    },
    zIndex: {
        type: Number,
        default: 999999
    }
};
export default props;
