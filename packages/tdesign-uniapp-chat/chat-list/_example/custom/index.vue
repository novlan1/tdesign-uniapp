<template>
    <view>
        <view class="chat-box chart-chat" :style="'height: ' + contentHeight + ';'">
            <t-chat>
                <block v-for="(item, chatIndex) in chatList" :key="chatIndex">
                    <t-chat-message
                        :class="item.message.role"
                        :avatar="item.avatar || ''"
                        :name="item.name || ''"
                        :datetime="item.datetime || ''"
                        :role="item.message.role || 'assistant'"
                        :placement="item.message.role === 'user' ? 'right' : 'left'"
                    >
                        <view slot="content">
                            <block v-for="(contentItem, contentIndex) in item.message.content" :key="contentIndex">
                                <t-chat-content :content="contentItem" v-if="contentItem.type === 'text' || contentItem.type === 'markdown'" />

                                <!-- 封装的图表组件见源码 -->

                                <chart-component v-if="contentItem.type === 'chart'" el="normalLine" :options="contentItem" />
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
import tToast from 'tdesign-uniapp/toast/toast';
import tChatMessage from 'tdesign-uniapp/chat-message/chat-message';
import tChatContent from 'tdesign-uniapp/chat-content/chat-content';
import tChat from 'tdesign-uniapp/chat-list/chat-list';
import tChatSender from 'tdesign-uniapp/chat-sender/chat-sender';
import tChatActionbar from 'tdesign-uniapp/chat-actionbar/chat-actionbar';
import chartComponent from '../chart-component';
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
        tToast,
        tChatMessage,
        tChatContent,
        tChat,
        tChatSender,
        tChatActionbar,
        chartComponent
    },
    data() {
        return {
            renderPresets: [
                {
                    name: 'send',
                    type: 'icon'
                }
            ],

            chatList: [
                {
                    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
                    message: {
                        role: 'assistant',
                        content: [
                            {
                                type: 'text',
                                data: '欢迎使用TDesign智能图表分析助手，请输入你的问题'
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

            // 动态样式
            // 内容高度
            contentHeight: '100vh',

            chatIndex: 0,
            contentIndex: 0,

            contentItem: {
                type: ''
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

        // 获取当前时间
        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
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
            const list = [assistantMessage, ...this.chatList];
            this.setData({
                chatList: list
            });
            const that = this;
            this.$nextTick(async () => {
                await fetchStream('今日上午北京道路车辆通行状况9:00的峰值（1320),可能显示早高峰拥堵最严重时段10:00后缓慢回落，可以得出如下折线图：', {
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
                that.chatList[0].message.content.push(
                    {
                        type: 'chart',
                        data: {
                            id: 8379.117942106575,
                            chartType: 'line',
                            options: {
                                xAxis: {
                                    boundaryGap: true,
                                    type: 'category',
                                    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00']
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [
                                    {
                                        data: [500, 401, 382, 433, 560, 630, 720],
                                        type: 'line'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        type: 'markdown',
                        data: ''
                    }
                );
                that.setData({
                    chatList: that.chatList
                });
                await fetchStream('今日晚上北京道路车辆通行状况18:00的峰值（1322),可能显示早高峰拥堵最严重时段21:00后缓慢回落，可以得出如下折线图：', {
                    success(result) {
                        if (!that.loading) {
                            return;
                        }
                        that.chatList[0].message.content[2].data += result;
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
                    type: 'chart',
                    data: {
                        id: 9954.694158956194,
                        chartType: 'line',
                        options: {
                            xAxis: {
                                boundaryGap: true,
                                type: 'category',
                                data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    data: [500, 401, 382, 433, 560, 630, 720],
                                    type: 'line'
                                }
                            ]
                        }
                    },
                    strategy: 'append',
                    status: 'complete'
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
                    value: v ? '南极的自动提款机叫什么名字' : '' // 输入框的值
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
