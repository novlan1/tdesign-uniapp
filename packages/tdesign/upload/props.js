const props = {
    addBtn: {
        type: Boolean,
        default: true
    },
    addContent: {
        type: String
    },
    allowUploadDuplicateFile: {
        type: Boolean,
        default: false
    },
    config: {
        type: Object
    },
    disabled: {
        type: null,
        default: void 0
    },
    draggable: {
        type: null
    },
    files: {
        type: Array,
        default: null
    },
    defaultFiles: {
        type: Array
    },
    gridConfig: {
        type: Object
    },
    gutter: {
        type: Number,
        default: 16
    },
    imageProps: {
        type: Object
    },
    max: {
        type: Number,
        default: 0
    },
    mediaType: {
        type: Array,
        default: ['image', 'video']
    },
    preview: {
        type: Boolean,
        default: true
    },
    removeBtn: {
        type: Boolean,
        default: true
    },
    requestMethod: {
        type: null
    },
    sizeLimit: {
        type: null
    },
    source: {
        type: String,
        default: 'media'
    },
    transition: {
        type: Object,
        value: {
            backTransition: true,
            duration: 300,
            timingFunction: 'ease'
        }
    }
};
export default props;
