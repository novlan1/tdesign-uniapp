const props = {
    addBtn: {
        type: Boolean,
        value: true
    },
    addContent: {
        type: String
    },
    allowUploadDuplicateFile: {
        type: Boolean,
        value: false
    },
    config: {
        type: Object
    },
    disabled: {
        type: null,
        value: void 0
    },
    draggable: {
        type: null
    },
    files: {
        type: Array,
        value: null
    },
    defaultFiles: {
        type: Array
    },
    gridConfig: {
        type: Object
    },
    gutter: {
        type: Number,
        value: 16
    },
    imageProps: {
        type: Object
    },
    max: {
        type: Number,
        value: 0
    },
    mediaType: {
        type: Array,
        value: ['image', 'video']
    },
    preview: {
        type: Boolean,
        value: true
    },
    removeBtn: {
        type: Boolean,
        value: true
    },
    requestMethod: {
        type: null
    },
    sizeLimit: {
        type: null
    },
    source: {
        type: String,
        value: 'media'
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
