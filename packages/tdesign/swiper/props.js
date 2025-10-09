const props = {
    autoplay: {
        type: Boolean,
        default: true
    },
    current: {
        type: Number,
        default: 0
    },
    direction: {
        type: String,
        default: 'horizontal'
    },
    displayMultipleItems: {
        type: Number,
        default: 1
    },
    duration: {
        type: Number,
        default: 300
    },
    easingFunction: {
        type: String,
        default: 'default'
    },
    height: {
        type: null,
        default: 192
    },
    imageProps: {
        type: Object
    },
    interval: {
        type: Number,
        default: 5000
    },
    list: {
        type: Array
    },
    loop: {
        type: Boolean,
        default: true
    },
    navigation: {
        type: null,
        default: true
    },
    nextMargin: {
        type: null,
        default: 0
    },
    paginationPosition: {
        type: String,
        default: 'bottom'
    },
    previousMargin: {
        type: null,
        default: 0
    },
    snapToEdge: {
        type: Boolean,
        default: false
    }
};
export default props;
