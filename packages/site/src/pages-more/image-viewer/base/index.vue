<template>
    <view>
        <t-button theme="primary" size="large" variant="outline" block @tap.native="onClick">基础图片预览</t-button>
        <t-toast id="t-toast" />
        <t-image-viewer
            usingCustomNavbar
            :deleteBtn="deleteBtn"
            :closeBtn="closeBtn"
            :showIndex="showIndex"
            :visible="visible"
            :images="images"
            @change="onChange"
            @delete="onDelete"
            @close="onClose"
        ></t-image-viewer>
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tToast from 'tdesign-uniapp/toast/toast';
import tImageViewer from 'tdesign-uniapp/image-viewer/image-viewer';
import Toast from 'tdesign-uniapp/toast/index';
export default {
    components: {
        tButton,
        tToast,
        tImageViewer
    },
    data() {
        return {
            visible: false,
            showIndex: false,
            closeBtn: false,
            deleteBtn: false,
            images: []
        };
    },
    methods: {
        onClick() {
            this.setData({
                images: ['https://tdesign.gtimg.com/mobile/demos/swiper1.png', 'https://tdesign.gtimg.com/mobile/demos/swiper2.png'],
                showIndex: true,
                visible: true
            });
        },
        onChange(e) {
            const { index } = e.detail;
            console.log('change', index);
        },
        onDelete(e) {
            const { index } = e.detail;
            Toast({
                context: this,
                selector: '#t-toast',
                message: `删除第${index + 1}个`
            });
        },
        onClose(e) {
            const { trigger } = e.detail;
            console.log(trigger);
            this.setData({
                visible: false
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
