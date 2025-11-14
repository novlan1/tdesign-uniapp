<template>
    <view>
        <view :class="'class ' + classPrefix" :style="_this._style([style, customStyle, inputStyle])" @tap="handleOutsideClick">
            <view :class="classPrefix + '__header'" :style="attachmentsProps.items && attachmentsProps.items.length > 0 ? 'margin-top:-8rpx;' : ''">
                <block v-if="attachmentsProps.items && attachmentsProps.items.length > 0">
                    <view :class="classPrefix + '__attachments'">
                        <attachments
                            :items="attachmentsProps.items"
                            :removable="attachmentsProps.removable"
                            :imageViewer="attachmentsProps.imageViewer"
                            @fileClick="handleFileClick"
                            @remove="handleFileRemove"
                            @add="handleFileAdd"
                        ></attachments>
                    </view>
                </block>
                <block v-else>
                    <slot name="header" />
                </block>
            </view>

            <view :class="classPrefix + '__actions'">
                <view :class="classPrefix + '__textarea'">
                    <slot name="input-prefix" />
                    <textarea
                        :class="classPrefix + '__textarea--control'"
                        :style="_this.textareaStyle(textareaProps.autosize)"
                        :disabled="disabled"
                        :auto-height="!!textareaProps.autosize"
                        confirm-type="send"
                        :adjust-position="adjustPosition"
                        :disable-default-padding="false"
                        cursor-spacing="30"
                        maxlength="-1"
                        :value="value"
                        @change="textChange"
                        @focus="focusFn"
                        @blur="blurFn"
                        @tap="handlerClick"
                        @input="textChange"
                        @keyboardheightchange="onkeyboardheightchange"
                        @confirm="handleSendClick"
                    ></textarea>
                    <view :class="classPrefix + '__textarea--placeholder ' + (focusFlag || value ? 'hide' : '')">{{ placeholder }}</view>
                </view>

                <view :class="classPrefix + '__footer'">
                    <view :class="classPrefix + '__mode'">
                        <slot name="footer-prefix" />
                    </view>
                    <view :class="classPrefix + '__sendbtn'">
                        <block v-if="renderPresets">
                            <view :class="classPrefix + '__sendbtn--default'">
                                <block v-for="(item, index) in renderPresets" :key="index">
                                    <view>
                                        <block v-if="item.name === 'upload'">
                                            <view :class="'plus-btn ' + (item.status === 'disabled' ? 'disabled' : '')">
                                                <block>
                                                    <view class="btn-func" :data-status="item.status" @tap.stop.prevent="handleUploadClick">
                                                        <t-icon :name="visible ? 'close' : 'add'" size="40rpx" />
                                                    </view>
                                                </block>
                                            </view>
                                        </block>

                                        <block v-if="item.name === 'send'">
                                            <block v-if="item.type === 'text'">
                                                <view :class="'send-btn-' + item.type + ' ' + (value || loading ? 'active' : 'disabled')" @tap="handleSendClick">
                                                    {{ loading ? '停止' : '发送' }}
                                                </view>
                                            </block>
                                            <block v-else>
                                                <view
                                                    :class="
                                                        'send-btn-icon send-btn-' + item.type + ' ' + (value || loading ? 'active' : 'disabled') + ' ' + (loading ? 'stop' : '')
                                                    "
                                                    @tap="handleSendClick"
                                                >
                                                    <block v-if="!loading">
                                                        <t-icon name="send-filled" size="32rpx" />
                                                    </block>
                                                    <block v-else>
                                                        <view style="width: 24rpx; height: 24rpx; background-color: #ffffff" />
                                                    </block>
                                                </view>
                                            </block>
                                        </block>
                                    </view>
                                </block>
                            </view>
                        </block>
                        <block v-else>
                            <slot name="suffix" />
                        </block>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="visible" :class="classPrefix + '__upload'" @tap.stop.prevent="handleUploadClick">
            <block v-for="(name, index) in uploadNames" :key="index">
                <view :class="classPrefix + '__upload-item'" :data-name="name" @tap="handleUploadEntryClick">
                    <view :class="classPrefix + '__upload-item__icon'">
                        <t-icon :name="uploadConfig[name].iconClass" size="56rpx" />
                    </view>
                    <view :class="classPrefix + '__upload-item__text'">{{ uploadConfig[name].text }}</view>
                </view>
            </block>
        </view>
    </view>
</template>
<script module="_this" lang="wxs" src="@/chat-sender/chat-sender.wxs"></script>
<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tIcon from 'tdesign-uniapp/icon/icon';
import attachments from 'tdesign-uniapp/attachments/attachments';
import { SuperComponent, wxComponent } from '../../../components/common/src/index';
import config from 'tdesign-uniapp/common/config';
import props from './props';

const { prefix } = config;
const name = `${prefix}-chat-sender`;

@wxComponent()
export default class ChatSender extends SuperComponent {
    options = {
        multipleSlots: true
    };

    properties = props;

    data = {
        classPrefix: name,
        scrollViewTop: 0,
        focusFlag: false,
        isSending: false,
        inputStyle: '',
        originalMarginBottom: 12, // 设计稿的 margin-bottom 值（单位：px）
        files: [],
        uploadPlacement: 'bottom',
        uploadConfig: {
            uploadCamera: {
                iconClass: 'camera',
                text: '拍摄',
                handler: 'handleImageUpload',
                handlerArg: 'camera'
            },
            uploadImage: {
                iconClass: 'image',
                text: '图片',
                handler: 'handleImageUpload',
                handlerArg: 'album'
            },
            uploadAttachment: {
                iconClass: 'file-add',
                text: '文件',
                handler: 'handleWechatFileUpload',
                handlerArg: 'attachment'
            }
        },
        uploadNames: []
    };

    observers = {
        fileList(newVal: any) {
            // 添加空值检查
            this.setData({
                files: newVal ? JSON.parse(JSON.stringify(newVal)) : []
            });
        },
        renderPresets(newVal: any) {
            const preset = newVal.find((item) => Array.isArray(item.presets));
            this.setData({
                uploadNames: preset ? preset.presets : []
            });
        }
    };

    methods = {
        onkeyboardheightchange(e: any) {
            // 业务侧控制键盘顶起高度，如果用fix布局，不需要监听键盘高度变化
            this.$emit('keyboardheightchange', {
                detail: e.detail
            });
            // 不开启自动顶起，不做处理
            if (!this.autoRiseWithKeyboard) return;
            const keyboardHeight = e.detail.height;
            if (keyboardHeight > 0) {
                // 键盘弹起时，将键盘高度与原始 margin-bottom 相加
                // todo：使用js计算实际的margin-bottom，因为业务侧可能会覆盖样式
                const totalMarginBottom = keyboardHeight + this.originalMarginBottom;
                this.setData({
                    inputStyle: `margin-bottom: ${totalMarginBottom}px;`
                });
            } else {
                // 键盘收起时，恢复原始 margin-bottom
                this.setData({
                    inputStyle: ''
                });
            }
        },

        handleSendClick(e: any) {
            this.loading ? this.handleStop(e) : this.sendClick(e);
        },

        handleOutsideClick() {
            this.$emit('updatevisible', {
                detail: false
            });
        },

        sendClick(e: any) {
            if (this.value && !this.disabled) {
                this.$emit('send', {
                    detail: {
                        value: this.value,
                        e
                    }
                });
            }
        },

        handleStop(e: any) {
            this.$emit(
                'stop',
                {
                    detail: {
                        value: this.value,
                        e
                    }
                },
                { bubbles: false }
            );
        },

        handlerClick() {
            // 禁用状态输入框无焦点
            if (this.disabled) {
                this.setData({
                    focusFlag: false
                });
            } else {
                this.setData({
                    focusFlag: true
                });
            }
        },

        focusFn(e: any) {
            this.setData({
                focusFlag: true
            });
            this.$emit('focus', {
                detail: { value: e.detail.value, context: e }
            });
        },

        blurFn(e: any) {
            this.setData({
                focusFlag: false
            });
            this.$emit('blur', {
                detail: { value: e.detail.value, context: e }
            });
        },

        textChange(e: any) {
            this.setData({
                value: e.detail.value
            });
            this.$emit('change', {
                detail: { value: e.detail.value, context: e }
            });
        },

        handleUploadClick(e: any) {
            const { status } = e.currentTarget.dataset;
            this.$emit('uploadClick');
            // 禁用状态不显示上传面板
            if (this.disabled || status === 'disabled') return;
            // 点击按钮切换面板显示状态
            this.$emit('updateVisible', {
                detail: !this.visible
            });
            // 透传处理上传按钮点击事件,由业务侧控制是否显示上传面板
        },

        handleFileClick(e: any) {
            // 透传 处理文件点击事件
            const { item } = e.detail;
            this.$emit('fileClick', {
                detail: { file: item }
            });
        },

        handleFileRemove(e: any) {
            // 添加数组存在性检查
            if (!Array.isArray(this.files)) return;
            const { item: file, index } = e.detail;
            this.$emit('fileDelete', {
                detail: { file }
            });
            const files = [...this.files];
            files.splice(index, 1);
            this.setData({ files });
            this.$emit('fileChange', {
                detail: { files }
            }); // 确保传递新数组
        },

        handleFileAdd() {
            this.$emit('fileAdd');
        },

        async handleImageUpload(e: any) {
            const { type } = e.currentTarget.dataset;
            const sourceType = [type];
            try {
                const res = await wx.chooseImage({
                    count: 1,
                    // 最多可选9张
                    sizeType: ['original', 'compressed'],
                    // 可以指定是原图还是压缩图
                    sourceType // 从相册选择
                });
                // 处理选择的图片
                if (res.tempFilePaths && res.tempFilePaths.length > 0) {
                    const files = res.tempFilePaths.map((item) => ({
                        url: item,
                        name: item,
                        // 获取文件名
                        size: 0,
                        // 暂时不支持获取文件大小
                        fileType: 'image' // 文件类型为图片
                    }));
                    const name = type === 'album' ? 'uploadImage' : 'uploadCamera';
                    this.$emit('fileSelect', {
                        detail: {
                            e,
                            name,
                            files
                        }
                    });
                    const newFiles = [...this.files, ...files];
                    this.setData({ files: newFiles });
                    this.$emit('fileChange', {
                        detail: { files: newFiles }
                    });
                }
            } catch (err) {
                wx.showToast({
                    title: type === 'album' ? '选择图片失败' : '拍照失败',
                    icon: 'none'
                });
            } finally {
                this.$emit('updatevisible', {
                    detail: false
                });
            }
        },

        async handleWechatFileUpload(e: any) {
            try {
                // 使用微信小程序的选择文件API
                const res = await wx.chooseMessageFile({
                    count: 5,
                    // 最多5个文件
                    type: 'all' // 所有类型文件
                });
                if (res.tempFiles && res.tempFiles.length > 0) {
                    const files = res.tempFiles.map((item) => ({
                        ...item,
                        // 其他属性保留
                        url: item.path // 获取文件路径
                    }));
                    const newFiles = [...this.files, ...files];
                    this.setData({ files: newFiles });
                    this.$emit('fileSelect', {
                        detail: {
                            e,
                            name: 'uploadAttachment',
                            files
                        }
                    });
                    this.$emit('fileChange', {
                        detail: { files: newFiles }
                    });
                }
            } catch (err) {
                wx.showToast({
                    title: '选择微信文件失败',
                    icon: 'none'
                });
            } finally {
                this.$emit('updatevisible', {
                    detail: false
                });
            }
        },

        handleUploadEntryClick(e: any) {
            const { name } = e.currentTarget.dataset;
            const config = this.uploadConfig[name];
            if (config && this[config.handler]) {
                this[config.handler]({ currentTarget: { dataset: { type: config.handlerArg } } });
            }
        }
    };

    lifetimes = {
        created() {
            // 绑定方法到 this.data
            this.onkeyboardheightchange = this.onkeyboardheightchange.bind(this);
            this.handleSendClick = this.handleSendClick.bind(this);
            this.handleOutsideClick = this.handleOutsideClick.bind(this);
            this.sendClick = this.sendClick.bind(this);
            this.handleStop = this.handleStop.bind(this);
            this.handlerClick = this.handlerClick.bind(this);
            this.focusFn = this.focusFn.bind(this);
            this.blurFn = this.blurFn.bind(this);
            this.textChange = this.textChange.bind(this);
            this.handleUploadClick = this.handleUploadClick.bind(this);
            this.handleFileClick = this.handleFileClick.bind(this);
            this.handleFileRemove = this.handleFileRemove.bind(this);
            this.handleFileAdd = this.handleFileAdd.bind(this);
            this.handleImageUpload = this.handleImageUpload.bind(this);
            this.handleWechatFileUpload = this.handleWechatFileUpload.bind(this);
            this.handleUploadEntryClick = this.handleUploadEntryClick.bind(this);
        },
        attached() {},
        detached() {
            // 组件销毁逻辑
        }
    };
}
</script>
<style lang="less">
@import './chat-sender.less';
</style>
