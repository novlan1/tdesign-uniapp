const props = {
    badgeProps: {
        type: Object,
        default:() => ({}),
        value:() => ({}),
    },
    description: {
        type: String
    },
    icon: {
        type: null
    },
    image: {
        type: String
    },
    imageProps: {
        type: Object
    },
    jumpType: {
        type: String,
        value: 'navigate-to'
    },
    layout: {
        type: String,
        value: 'vertical'
    },
    text: {
        type: String
    },
    url: {
        type: String,
        value: ''
    }
};
export default props;
