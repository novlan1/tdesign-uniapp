<template>
    <view class="wrapper">
        <t-upload
            disabled
            :mediaType="['video', 'image']"
            :files="originFiles"
            :gridConfig="gridConfig"
            :config="config"
            source="messageFile"
            @success="handleSuccess"
            @remove="handleRemove"
        ></t-upload>
    </view>
</template>

<script>
import tUpload from './tdesign-miniprogram/upload/upload';
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
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
