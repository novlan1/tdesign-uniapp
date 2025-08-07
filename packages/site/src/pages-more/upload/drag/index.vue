<template>
    <view class="wrapper">
        <t-upload
            draggable
            disabled
            :media-type="['video', 'image']"
            :files="originFiles"
            :gridConfig="gridConfig"
            @success="handleSuccess"
            @remove="handleRemove"
            @click="handleClick"
            @drop="handleDrop"
        />
    </view>
</template>

<script>
import tUpload from 'tdesign-uniapp/upload/upload';
export default {
    components: {
        tUpload
    },
    data() {
        return {
            originFiles: [
                {
                    url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
                    name: 'uploaded1.png',
                    type: 'image'
                },
                {
                    url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
                    name: 'uploaded2.png',
                    type: 'image'
                },
                {
                    url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
                    name: 'uploaded3.png',
                    type: 'image'
                }
            ],
            gridConfig: {
                column: 4,
                width: 160,
                height: 160
            },
            config: {
                count: 1
            }
        };
    },
    methods: {
        handleSuccess(e) {
            const { files } = e.detail;
            this.setData({
                originFiles: files
            });
        },
        handleRemove(e) {
            const { index } = e.detail;
            const { originFiles } = this;
            originFiles.splice(index, 1);
            this.setData({
                originFiles
            });
        },
        handleClick(e) {
            console.log(e.detail.file);
        },
        handleDrop(e) {
            const { files } = e.detail;
            this.setData({
                originFiles: files
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
