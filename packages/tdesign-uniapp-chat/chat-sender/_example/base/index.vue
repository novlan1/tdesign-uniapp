<template>
    <view class="demo-base-container">
        <!-- 聊天发送器组件 -->
        <view class="chat-sender-demo-wrapper">
            <view class="chat-sender-height-limit">
                <view class="chat-sender-height-left-limit"></view>
                <view class="chat-sender-height-right-limit"></view>
            </view>
            <view class="chat-sender-placeholder">高度限制：最大高度为132px</view>
            <view class="chat-sender-wrapper">
                <t-chat-sender
                    :value="value"
                    :loading="loading"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    :textareaProps="textareaProps"
                    :fileList="fileList"
                    :attachmentsProps="attachmentsProps"
                    :renderPresets="renderPresets"
                    :visible="visible"
                    @send="onSend"
                    @stop="onStop"
                    @focus="onFocus"
                    @blur="onBlur"
                    @change="onChange"
                    @uploadClick="onUploadClick"
                    @fileClick="onFileClick"
                    @fileDelete="onFileDelete"
                    @fileChange="onFileChange"
                    @fileAdd="onFileAdd"
                    @fileSelect="onFileSelect"
                    @updateVisible="onUpdateVisible"
                    @keyboardheightchange="onKeyboardHeightChange"
                >
                    <view slot="footer-prefix" class="demo-footer-prefix">
                        <view :class="'deep-think-block ' + (deepThinkActive ? 'active' : '')" @tap="onDeepThinkTap">
                            <t-icon name="system-sum" size="40rpx" />
                            <text class="deep-think-text">深度思考</text>
                        </view>
                        <view :class="'net-search-block ' + (netSearchActive ? 'active' : '')" @tap="onNetSearchTap">
                            <t-icon name="internet" size="40rpx" />
                        </view>
                    </view>
                </t-chat-sender>
            </view>
            <view class="demo-footer">内容由AI生成，仅供参考</view>
        </view>
    </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import tChatSender from 'tdesign-uniapp/chat-sender/chat-sender';
export default {
    components: {
        tNavbar,
        tChatSender
    },
    data() {
        return {
            value: '',
            loading: false,
            disabled: false,
            fileList: [],
            visible: false,
            placeholder: '请输入消息...',
            textareaProps: {
                autosize: {
                    maxHeight: 264,
                    minHeight: 48 // 设置为0时，用自动计算height的高度
                } // 默认为false
            },
            attachmentsProps: {
                items: [],
                removable: true,
                imageViewer: true,
                addable: false
            },
            renderPresets: [
                {
                    name: 'send',
                    type: 'icon'
                }
            ],
            deepThinkActive: false,
            netSearchActive: false
        };
    },
    methods: {
        // 发送消息
        onSend(e) {
            const { value } = e.detail;
            console.log('发送消息:', value);
            if (!value.trim()) {
                uni.showToast({
                    title: '请输入消息内容',
                    icon: 'none'
                });
                return;
            }

            // 模拟发送状态
            this.setData({
                loading: true
            });
            setTimeout(() => {
                if (this.loading) {
                    this.setData({
                        loading: false,
                        value: '' // 清空输入框
                    });
                    uni.showToast({
                        title: '发送成功',
                        icon: 'success'
                    });
                }
            }, 3000);
        },

        // 停止发送
        onStop(e) {
            const { value } = e.detail;
            console.log('停止发送:', value);
            this.setData({
                loading: false
            });
            uni.showToast({
                title: '已停止发送',
                icon: 'none'
            });
        },

        // 输入框聚焦
        onFocus(e) {
            const { value, context } = e.detail;
            console.log('输入框聚焦:', value, context);
        },

        // 输入框失焦
        onBlur(e) {
            const { value, context } = e.detail;
            console.log('输入框失焦:', value, context);
        },

        // 输入内容变化
        onChange(e) {
            const { value } = e.detail;
            console.log('输入内容变化:', value);
            this.setData({
                value
            });
        },

        // 点击上传按钮
        onUploadClick() {
            console.log('点击上传按钮');
        },

        // 点击文件
        onFileClick(e) {
            const { file } = e.detail;
            console.log('点击文件:', file);
            uni.showToast({
                title: `点击了文件: ${file.name}`,
                icon: 'none'
            });
        },

        // 删除文件
        onFileDelete(e) {
            const { file } = e.detail;
            console.log('删除文件:', file);
            uni.showToast({
                title: '文件删除成功',
                icon: 'success'
            });
        },

        // 文件列表变化
        onFileChange(e) {
            console.log(e, 'e----');
            const { files } = e.detail;
            console.log('文件列表变化:', files);
            this.setData({
                fileList: files
            });
        },

        // 添加文件
        onFileAdd() {
            console.log('添加文件');
        },

        // 选择文件
        onFileSelect(e) {
            const { name, files } = e.detail;
            console.log('选择文件:', name, files);
            uni.showToast({
                title: `选择了${files.length}个文件`,
                icon: 'success'
            });
        },

        // 上传面板显示状态变化
        onUpdateVisible(e) {
            const visible = e.detail;
            console.log('上传面板显示状态:', visible);
            this.setData({
                visible
            });
        },

        // 键盘高度变化
        onKeyboardHeightChange(e) {
            console.log('键盘高度变化:', e.detail);
        },

        // 切换禁用状态
        toggleDisabled() {
            this.setData({
                disabled: !this.disabled
            });
        },

        // 切换加载状态
        toggleLoading() {
            this.setData({
                loading: !this.loading
            });
        },

        // 清空输入框
        clearInput() {
            this.setData({
                value: ''
            });
        },

        onDeepThinkTap() {
            this.setData({
                deepThinkActive: !this.deepThinkActive
            });
        },

        onNetSearchTap() {
            this.setData({
                netSearchActive: !this.netSearchActive
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
