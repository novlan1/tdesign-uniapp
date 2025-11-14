<template>
    <view>
        <view class="chat-box image-chat" :style="'height: ' + contentHeight + ';'">
            <t-chat>
                <block v-for="(item, chatIndex) in chatList" :key="chatIndex">
                    <t-chat-message
                        :avatar="item.avatar || ''"
                        :name="item.name || ''"
                        :datetime="item.datetime || ''"
                        :role="item.message.role"
                        :placement="item.message.role === 'user' ? 'right' : 'left'"
                    >
                        <view v-if="item.message.role === 'user'" slot="content">
                            <block v-for="(contentItem, contentIndex) in item.message.content" :key="contentIndex">
                                <t-chat-content :content="contentItem" v-if="contentItem.type === 'text' || contentItem.type === 'markdown'" />
                            </block>
                        </view>
                        <view v-else style="width: 100%" slot="content">
                            <block v-for="(contentItem, contentIndex) in item.message.content" :key="contentIndex">
                                <t-chat-content :content="contentItem" v-if="contentItem.type === 'text' || contentItem.type === 'markdown'" />

                                <view v-else class="attachment-slide">
                                    <t-attachments :items="contentItem.data" :inChat="true" :removable="false" />
                                </view>
                            </block>
                        </view>
                        <t-chat-actionbar
                            v-if="chatIndex !== chatList.length - 1 && item.message.status === 'complete' && item.message.role === 'assistant'"
                            slot="actionbar"
                            placement="end"
                            @actions="handleAction"
                        />
                    </t-chat-message>
                </block>
                <view slot="footer">
                    <t-chat-sender
                        :value="value"
                        :loading="loading"
                        :disabled="disabled"
                        :renderPresets="renderPresets"
                        @send="onSend"
                        @stop="onStop"
                        @focus="onFocus"
                        :autoRiseWithKeyboard="true"
                    />
                </view>
            </t-chat>
        </view>
        <t-toast id="t-toast" />
    </view>
</template>

<script>
import tChatMessage from 'tdesign-uniapp/chat-message/chat-message';
import tChatContent from 'tdesign-uniapp/chat-content/chat-content';
import tChat from 'tdesign-uniapp/chat-list/chat-list';
import tChatSender from 'tdesign-uniapp/chat-sender/chat-sender';
import tChatActionbar from 'tdesign-uniapp/chat-actionbar/chat-actionbar';
import tAttachments from 'tdesign-uniapp/attachments/attachments';
import tToast from 'tdesign-uniapp/toast/toast';
import Toast from 'tdesign-uniapp/toast';
import { getNavigationBarHeight } from '../../../utils/utils';
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const fetchStream = async (str, options) => {
    const { success, complete, delay = 100 } = options;
    const arr = str.split('');
    for (let i = 0; i < arr.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay);
        success(arr[i]);
    }
    complete();
};
export default {
    components: {
        tChatMessage,
        tChatContent,
        tChat,
        tChatSender,
        tChatActionbar,
        tAttachments,
        tToast
    },
    data() {
        return {
            renderPresets: [
                {
                    name: 'send',
                    type: 'icon'
                }
            ],

            customActionBar: ['good', 'bad'],

            chatList: [
                {
                    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
                    message: {
                        role: 'assistant',
                        content: [
                            {
                                type: 'text',
                                data: '欢迎使用TDesign智能生图助手，请先写下你的创意，可以试试上传参考图哦～'
                            }
                        ]
                    }
                }
            ],

            value: '',

            // 输入框的值
            loading: false,

            // 加载状态
            disabled: false,

            // 禁用状态
            inputStyle: '',

            // 输入框动态样式
            attachmentsProps: {
                items: [],
                removable: true,
                imageViewer: true,
                addable: false
            },

            // 内容高度
            contentHeight: '100vh',

            chatIndex: 0,
            contentIndex: 0,

            contentItem: {
                type: '',
                data: ''
            }
        };
    },
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    options: {
        styleIsolation: 'shared'
    },
    methods: {
        attached: function () {
            /**
             * 计算内容区域高度
             * 生成CSS calc表达式：calc(100vh - 96rpx - 导航高度 - 底部安全区域高度)
             */
            try {
                // 获取当前的导航栏高度和安全区域高度
                const navigationBarHeight = getNavigationBarHeight() || 0;

                // 生成CSS calc表达式字符串
                const contentHeight = `calc(100vh - 96rpx - ${navigationBarHeight}px)`;
                this.setData({
                    contentHeight: contentHeight
                });
                console.log('内容区域高度CSS表达式:', contentHeight);
            } catch (error) {
                console.log('CatchClause', error);
                console.log('CatchClause', error);
                console.error('生成内容高度表达式失败:', error);
                this.setData({
                    contentHeight: 'calc(100vh - 96rpx)'
                });
            }
        },

        // 发送消息事件处理
        onSend(e) {
            const { value } = e.detail;
            if (!value || value.trim() === '') {
                return;
            }

            // 创建用户消息对象
            const userMessage = {
                message: {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            data: value.trim()
                        }
                    ]
                }
            };

            // 将用户消息插入到chatList的开头（因为reverse为true，所以用unshift）
            this.setData({
                chatList: [userMessage, ...this.chatList],
                value: '' // 清空输入框
            });

            // 模拟助手回复（可选）
            this.simulateAssistantReply(value.trim());
        },

        // 停止事件处理
        onStop() {
            console.log('停止发送');
            this.setData({
                loading: false
            });
        },

        // 聚焦事件处理
        onFocus() {
            console.log('输入框聚焦');
        },

        // 打开选择文件界面
        onUpdateVisible() {
            const that = this;
            uni.chooseMessageFile({
                count: 1,
                type: 'file',
                success(res) {
                    const tempFile = res.tempFiles[0];
                    console.log('选择的文件信息：', tempFile);
                    const item = {
                        fileType: 'doc',
                        name: tempFile.name,
                        url: tempFile.path,
                        size: tempFile.size,
                        status: 'success'
                    };
                    that.setData({
                        attachmentsProps: {
                            ...that.attachmentsProps,
                            items: [item]
                        }
                    });
                },
                fail(err) {
                    console.error('选择文件失败：', err);
                }
            });
        },

        // 模拟助手回复
        simulateAssistantReply() {
            this.setData({
                loading: true
            });
            const assistantMessage = {
                avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
                message: {
                    role: 'assistant',
                    content: [
                        {
                            type: 'markdown',
                            data: ''
                        }
                    ]
                }
            };
            this.setData({
                chatList: [assistantMessage, ...this.chatList]
            });
            const that = this;
            this.$nextTick(async () => {
                await fetchStream('接下来我将生成符合要求的图片', {
                    success(result) {
                        if (!that.loading) {
                            return;
                        }
                        that.chatList[0].message.content[0].data += result;
                        that.setData({
                            chatList: that.chatList
                        });
                    },
                    complete() {}
                });
                if (!that.loading) {
                    return;
                }
                that.chatList[0].message.content.push({
                    type: 'imageview',
                    status: 'complete',
                    data: [
                        {
                            name: 'sample1.png',
                            url: 'https://tdesign.gtimg.com/site/square.png',
                            fileType: 'image',
                            status: 'success',
                            size: 1032,
                            width: 128,
                            height: 128
                        },
                        {
                            name: 'sample2.png',
                            url: 'https://tdesign.gtimg.com/site/square.png',
                            fileType: 'image',
                            status: 'success',
                            size: 1032,
                            width: 128,
                            height: 128
                        },
                        {
                            name: 'sample3.png',
                            url: 'https://tdesign.gtimg.com/site/square.png',
                            fileType: 'image',
                            status: 'success',
                            size: 1032,
                            width: 128,
                            height: 128
                        },
                        {
                            name: 'sample4.png',
                            url: 'https://tdesign.gtimg.com/site/square.png',
                            fileType: 'image',
                            status: 'success',
                            size: 1032,
                            width: 128,
                            height: 128
                        },
                        {
                            name: 'sample5.png',
                            url: 'https://tdesign.gtimg.com/site/square.png',
                            fileType: 'image',
                            status: 'success',
                            size: 1032,
                            width: 128,
                            height: 128
                        }
                    ]
                });
                that.chatList[0].message.status = 'complete';
                that.setData({
                    chatList: that.chatList,
                    loading: false
                });
            });
        },

        handleAction(e) {
            const { name, active, data } = e.detail;
            console.log('----', name);
            let message = '';
            switch (name) {
                case 'replay':
                    message = '重新生成';
                    break;
                case 'copy':
                    console.log(data);
                    message = '复制成功';
                    break;
                case 'good':
                    message = active ? '点赞成功' : '取消点赞';
                    break;
                case 'bad':
                    message = active ? '点踩成功' : '取消点踩';
                    break;
                case 'share':
                    message = '分享功能';
                    break;
                default:
                    message = `执行了${name}操作`;
            }
            Toast({
                context: this,
                selector: '#t-toast',
                message,
                theme: 'success'
            });
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    created: function () {},
    watch: {
        isActive: {
            handler: function (v) {
                this.setData({
                    value: v ? '请为Tdesign设计三张品牌宣传图' : '' // 输入框的值
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
